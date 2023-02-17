import { Injectable } from '@nestjs/common';
import { MailhogClient } from 'mailhog-awesome'


export class MailhogClientService {
    private mailhog: MailhogClient;
    private static instance: MailhogClientService;

    constructor() {
        // Initialize the mailhog client here
        this.mailhog = new MailhogClient({
            host: 'localhost',
            port: 8025,
        });
    }

    public static getInstance(): MailhogClientService {
        if (!MailhogClientService.instance) {
            MailhogClientService.instance = new MailhogClientService();
        }

        return MailhogClientService.instance;
    }

    getMailhog(): MailhogClient {
        return this.mailhog;
    }
}