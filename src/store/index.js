"use strict";

import Vue from "vue";
import Vuex from "vuex";
import * as Home from "./modules/home";
import * as Login from "./modules/login";


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        ...Home.state,
        ...Login.state,

    },
    actions: {
        ...Home.actions,
        ...Login.actions

    },
    getters: {
        ...Home.getters,
        ...Login.getters,

    },
    mutations: {
        ...Home.mutations,
        ...Login.mutations,

    }
});
