export interface MailJob {
  mailOpts: {
    from: string;
    to: string;
    subject: string;
    text?: string;
    html?: string;
    generateTextFromHTML?: boolean;
  };
  htmlAttachments?: {
    name: string;
    html: string;
  }[];
}
