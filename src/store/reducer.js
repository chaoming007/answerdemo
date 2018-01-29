import axios from 'axios'

let defaultState={
	score:0,
	answerCurrentNum:0,
	answerCurrent:{},
	answerContent:[],
	nowNum:1       //当前第几题
};

const GETDATE="GETDATE";  //获得题目数据
const CURRENTDATE="CURRENTDATE"; //下一道题内容
const ADDSCORE="ADDSCORE";       //分数增加
const ADDNOWNUM="ADDNOWNUM";     //已达题目数量

function reducerFun(state=defaultState,action){
	switch(action.type){
		case  GETDATE:
			state.answerContent=[...action.dat.data];
			state.answerCurrent={...state.answerContent[state.answerCurrentNum]};
			return Object.assign({},state);
		case  CURRENTDATE:
			state.answerCurrentNum=action.arg;
			state.answerCurrent={...state.answerContent[action.arg]};
			return Object.assign({},state);
		case  ADDSCORE:
			state.score=state.score+action.arg;
			return Object.assign({},state);
		case  ADDNOWNUM:
			state.nowNum=state.nowNum+action.arg;
			return Object.assign({},state);
		default:
		    return state;
	}
}

export const getData=(arg)=>(dispatch)=>{

	axios.get("/src/js/data.json").then((res)=>{
	    if(res.status===200&&res.statusText==="OK"){
	    	dispatch({
		    	type:GETDATE,
		    	dat:res.data
		    });
	    }
		
	})
}

export const currentData=(arg)=>{
	let num=arg||0;
	return{
		type:CURRENTDATE,
		arg:num
	}
}

export const addScore=(arg)=>{
	return{
		type:ADDSCORE,
		arg
	}
}

export const addNowNum=(arg)=>{
	return{
		type:ADDNOWNUM,
		arg
	}
}

export default reducerFun;