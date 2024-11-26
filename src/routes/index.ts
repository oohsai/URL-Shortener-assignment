import { Router } from 'express';
import { urlSchema } from '../types';
import prisma from '../db/db';
import { generateShortId } from '../services/services';

export const router = Router();

router.post('/shorten', async (req,res) => {
    const parsedData = await urlSchema.safeParse(req.body);

    if(!parsedData.success){
        res.status(400).json({ error: 'Invalid URL' });
        return
    }

    try {
        const shortID = await generateShortId();
        const newUrl = await prisma.uRL.create({
            data: {
                originalUrl : parsedData.data.originalUrl,
                shortId : shortID,
                clicks : 0,
            }
        })
        res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/api/v1/${newUrl.shortId}` });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'Invalid Url' });
        return
    }
});

router.get('/:shortId', async (req,res) => {
    try {
            let defaultUrl = await prisma.uRL.findUnique({
                where : {
                    shortId : req.params.shortId
                }
            })
            const updateUsage = await prisma.uRL.update({
                where : {
                    shortId : req.params.shortId
                }, 
                data : {
                    clicks : {increment:1},
                    lastAccessed : new Date(),
                }
            })
            if (!defaultUrl) {
                res.status(404).json({ error: 'Short URL not found' });
                return
            }
            res.redirect(302, defaultUrl.originalUrl);
            return
        } catch (error) {
        res.status(404).json({ error: 'Try Again' });
        return
    }
    
} );

router.get('/stats/:shortId', async (req,res) => {
    try {
        const stats = await prisma.uRL.findUnique({
            where : {
                shortId : req.params.shortId
            }
        })

        if (!stats) {
            res.status(404).json({ error: 'Short URL not found' });
            return
        }
        res.status(201).json({ clicks: stats.clicks, lastAccessed: stats.lastAccessed });
        return
    } catch (error) {
        res.status(500).json({ error: 'Fetch Again' });
    }
});

