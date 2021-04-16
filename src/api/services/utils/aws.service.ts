import AWS from "aws-sdk";
import config from "../../../config";
import logger from "../../../utils/logger";

AWS.config.update(config.aws.credentials)


export const sendEmailToActive = async (email: string, code: string) => {
    logger.info("send email to active: " + email)
    const templateData = {
        email, code
    }

    return sendEmail(email, templateData, config.aws.templates.register);
}

export const sendEmailLogin = async (email: string, code: string) => {
    logger.info("send email to login: " + email)
    const templateData = {
        email, code
    }

    return sendEmail(email, templateData, config.aws.templates.login);
}

export const sendSmsLogin = async (phoneNumber: string, code: string) => {
    logger.info("send sms to login: " + phoneNumber)
    const params = {
        Message: `Code to login is: ${code}`,
        PhoneNumber: phoneNumber,
    };
    // @ts-ignore
    const snsService = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();

    return await snsService
        .then((data: any) => {
            const messageId = data.MessageId;
            logger.info(`sms sent to ${phoneNumber}: ${messageId}`);

            return messageId;
        })
        .catch((err: any) => {
            logger.error(`Error sent sms to ${phoneNumber}: ` + err.message)
        });
}

export const sendEmail = (email: string, templateData: any, template: string) => {
    const sesService = new AWS.SES({apiVersion: '2010-12-01'})
    const params = {
        Destination: {
            ToAddresses: [email],
            CcAddresses: []
        },
        ReplyToAddresses: [config.aws.sender],
        Source: config.aws.sender,
        Template: template,
        TemplateData: JSON.stringify(templateData)
    }

    // @ts-ignore
    return sesService.sendTemplatedEmail(params).promise()
        .then((data: any) => {
            const messageId = data.MessageId;
            logger.info(`email sent to ${email}: ${messageId}`);

            return messageId;
        })
        .catch((err: any) => {
            logger.error(`Error sent email to ${email}: ` + err.message)
        })
}