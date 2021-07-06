const clear = (data)=>{

    for (const key in data) {
        data[key]='';
    }
}

export default clear;