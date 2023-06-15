export const ExpenseSplitInitialStates = {
  tourDesc: "",
  tourMembers: [],
  initialStage: true,
  /**
   * eachSpentExpenses {[]} sample
   *amountSpent: "6000"
    membersToShare: ['Harish', 'Shafee', 'Pooja', 'Udhaya', 'Thani']
    payer: "Harish"
  */
  eachSpentExpenses: [],
  /**
   * amountOwnsToEachOthersList sample
   * [{
    "name": "Harish",
    "shareAmountTo": [
        {
            "name": "Shafee",
            "amountToShare": 0
        },
        {
            "name": "Thani",
            "amountToShare": 0
        },
        {
            "name": "Pooja",
            "amountToShare": 0
        },
        {
            "name": "Udhaya",
            "amountToShare": 0
        }
    ]
}]
   */
  amountOwnsToEachOthersList: {},
};
