"use strict";

import axios from "axios";
import qs from "qs";
import _ from "lodash";
import * as type from "../mutation-types";

export const state = {
    loading: false,
    errorInfo: {},
    teacherInfo: {}
};

export const getters = {
    loading: state => state.loading,
    errorInfo: state => state.errorInfo,
    teacherInfo: state => state.teacherInfo,
};


export const actions = {
    getTeacherInfo({commit}) {
        commit(type.TEACHER_INFO);
    },

    reset({commit}) {
        commit(type.RESET);
    }
};

export const mutations = {
    [type.TEACHER_INFO](state) {
        state.loading = true;
        return axios({
            url: Config.teacherInfo,
            withCredentials: true
        })
            .then((res) => {
                state.loading = false;
                const {status, data} = res;
                if (status === 200) {
                    state.teacherInfo = data;
                } else {
                    state.errorInfo = data;
                }
            })
            .catch((e) => {
                state.loading = false;
                state.errorInfo = e;
            });
    },

    [type.RESET](state) {
        state = {
            loading: false,
            errorInfo: {},
            teacherInfo: {},
            detail: {},
            listCourse: [],
            uploadRes: {},
            couseInfo: {},
            contents: []
        };
        return state;
    }
};



