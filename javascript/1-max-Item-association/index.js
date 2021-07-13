const maxItemAssociation = (shoppingLists) => {
  const shoppingListsCopy = [...shoppingLists];
  let recommendations = [];


  for (let i = 0; i < shoppingLists.length; i++) {
    let recommendationGroup = [...shoppingLists[i]];

    for (let k = 0; k < shoppingListsCopy.length; k++) {
      if (i === k) {
        continue;
      }

      if (shoppingListsCopy[k].some(item => shoppingLists[i].indexOf(item) > -1)) {

        recommendationGroup = [...new Set([...recommendationGroup, ...shoppingListsCopy[k]])];
      }
    }

    recommendations.push(recommendationGroup.sort());
  }

  recommendations.sort((a, b) => {
    return b.length - a.length || a.join().localeCompare(b.join());
  });

  return recommendations[0];
}