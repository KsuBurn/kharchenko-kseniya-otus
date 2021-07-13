const promiseReduce = (asyncFunctions, reduce, initialValue) => {

  const reduceFunc = async () => {  
    let memo = initialValue;
    for (let i = 0; i < asyncFunctions.length; i++) {
      const res = await asyncFunctions[i]();
      memo = reduce(memo, res);
    }

    return memo;
  }

  return reduceFunc()
    .then(res => res)
    .catch(err => err)
}
