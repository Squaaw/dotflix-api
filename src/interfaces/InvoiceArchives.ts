interface InvoiceArchives{
    customerId?: Number,
    _id: Number,
    amount: Number,
    sentAt: Date,
    status: String,
    chrono: Number,
    createdAt: Date
}

export { InvoiceArchives }