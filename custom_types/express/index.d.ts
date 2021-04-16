declare namespace Express {
    interface Request {
        user: {
            id: number,
            email: string
        };
    }

    interface Error {
        status?: number
    }
}
