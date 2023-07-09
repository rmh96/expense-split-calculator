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
        //-----1-----
        //update member's amountToShare inside payer
        const payerObj = mainObj.find((obj) => obj.name === payer);
        const memberObInsidePayer = payerObj.shareAmountTo.find(
          (obj) => obj.name === member
        );
        if (memberObInsidePayer.amountToShare < contribution) {
          console.log("@@@@check1");
          memberObInsidePayer.amountToShare = 0;
        }
        //-----2-----
        //update payer's aountToShare inside member
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
      } else if (diffLogic.flag === "inMemberAdd") {
        const memberObj = mainObj.find((obj) => obj.name === member);
        const payerObjInsideMember = memberObj.shareAmountTo.find(
          (obj) => obj.name === payer
        );
        payerObjInsideMember.amountToShare += contribution;
      }
    });
  }
  return mainObj;
};

const checkExistingDebt = (payer, member, contribution, mainObj) => {
  if (payer !== member) {
    const payerObj = mainObj.find((obj) => obj.name === payer);
    const memberObj = payerObj.shareAmountTo.find((obj) => obj.name === member);

    const finalAmount =
      memberObj.amountToShare > contribution
        ? {
            flag: "inPayer",
            amount: Math.abs(memberObj.amountToShare - contribution),
          }
        : memberObj.amountToShare < contribution &&
          memberObj.amountToShare === 0
        ? {
            flag: "inMemberAdd",
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
    console.log(`P-${payer} : M-${member}, ${contribution}`);
    console.log(finalAmount);
    return finalAmount;
  }
  return false;
};
