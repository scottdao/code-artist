const  counter= (state=0,action)=>{
    switch (action.tx) {
    case 'ADDTo':
      return state + action.tx;
    default: 
      return state;
  }
};

export default counter