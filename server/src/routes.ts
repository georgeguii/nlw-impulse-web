import express from 'express';
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbacksRepository } from './repositories/primas/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/submit-feedback-service';

export const routes = express.Router();

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ca32a9912d7102",
        pass: "97f255e954538e"
    }
});

routes.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    )

    await submitFeedbackService.execute({
        type,
        comment,
        screenshot,
    })

    // await transport.sendMail({
    //     from: 'Equipe Feeget <oi@feedget.com>',
    //     to: 'George Guilherme <george.gui2000@gmail.com>',
    //     subject: 'Novo feedback',
    //     html: [
    //         `<div style="font-family: sans-serif; font-size: 16px; color: #111;"`,
    //         `<p>Tipo do feedback: ${type}</p>`,
    //         `<p>Comentário do feedback: ${comment}</p>`,
    //         `</div>`,
    //     ].join('')
    // });

    return res.status(201).send();
})