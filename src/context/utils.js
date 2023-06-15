export const calculateEachShare = (expenseDetail, mainObj) => {
  if (expenseDetail) {
    const payer = expenseDetail.payer;
    const amountSpent = expenseDetail.amountSpent;
    const membersToShare = expenseDetail.membersToShare;

    const contribution = amountSpent / membersToShare.length;

    membersToShare.forEach((member) => {
      const diffLogic = checkExistingDebt(payer, member, contribution, mainObj);
      if (diffLogic.flag === "inPayer") {
        const payerObj = mainObj.find((obj) => obj.name === payer);
        const memberObInsidePayer = payerObj.shareAmountTo.find(
          (obj) => obj.name === member
        );
        memberObInsidePayer.amountToShare = diffLogic.amount;
      } else if (diffLogic.flag === "inMember") {
        const memberObj = mainObj.find((obj) => obj.name === member);
        const payerObjInsideMember = memberObj.shareAmountTo.find(
          (obj) => obj.name === payer
        );
        payerObjInsideMember.amountToShare = diffLogic.amount;
      } else if (diffLogic.flag === "equal") {
        //update in payer
        const payerObj = mainObj.find((obj) => obj.name === payer);
        const memberObInsidePayer = payerObj.shareAmountTo.find(
          (obj) => obj.name === member
        );
        memberObInsidePayer.amountToShare = 0;
        //update in member
        const memberObj = mainObj.find((obj) => obj.name === member);
        const payerObjInsideMember = memberObj.shareAmountTo.find(
          (obj) => obj.name === payer
        );
        payerObjInsideMember.amountToShare = 0;
      }
    });
  }
  return mainObj;
};

const checkExistingDebt = (payer, member, contribution, mainObj) => {
  if (payer !== member) {
    const payerObj = mainObj.find((obj) => obj.name === payer);
    const memberObj = payerObj.shareAmountTo.find((obj) => obj.name === member);
    return memberObj.amountToShare > contribution
      ? {
          flag: "inPayer",
          amount: Math.abs(memberObj.amountToShare - contribution),
        }
      : memberObj.amountToShare < contribution
      ? {
          flag: "inMember",
          amount: Math.abs(memberObj.amountToShare - contribution),
        }
      : memberObj.amountToShare === contribution && {
          flag: "equal",
          amount: 0,
        };
  }
  return false;
};
