"use strict";

import * as type from "../mutation-types";


//--------------------
//state
//--------------------
export const state = {
    listCourse: []
};
//--------------------
//getters
//--------------------
export const getters = {
    listCourse: state => state.listCourse
};
//--------------------
//actions
//--------------------
export const actions = {
    home({commit}) {
        commit(type.HOME);
    },


};
//--------------------
//actions
//--------------------
export const mutations = {
    [type.HOME](state) {
       console.log(state)
        return {"home":"首页"}
    },

};

