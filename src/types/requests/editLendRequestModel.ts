type editLendRequestModel = {
    accountId: number;
    itemId: number;
    lendDate: Date;
    returnDate?: Date | null;
}

export default editLendRequestModel;