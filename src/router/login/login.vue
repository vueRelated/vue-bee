/**
* Created by Administrator on 2017/03/16.
*/
<template>
    <div>
        <div>
            用户名
            <input v-model="username" />
        </div>
        <div>
            手机号码
            <input v-model="mobile" />
        </div>
        <div>
            邮箱
            <input v-model="email" />
        </div>
        <div>
            密码
            <input v-model="password" />
        </div>
        <div>
            确认密码
            <input v-model="password2" />
        </div>
        <div class="btn" @click="submit">提交</div>
    </div>
</template>

<script>
    import schema from 'async-validator'
    export default{
        data() {
            return {
                username:"",
                mobile:"",
                email:"",
                password:"",
                password2:""
            }
        },
        methods:{

            submit(){
                var descriptor = {
                    username: {type: "string", required: true},
                    mobile: {type: "string", required: true},
                    email: [
                        {type: "string", required: true, pattern: schema.pattern.email},
                        {validator(rule, value, callback, source, options) {
                            var errors = [];
                            // test if email address already exists in a database
                            // and add a validation error to the errors array if it does
                            callback(errors);
                        }}
                    ],
                    password: {type: "string", required: true},
                    password2: {type: "string", required: true}
                }
                var validator = new schema(descriptor);
                validator.validate({
                    username: this.username,
                    mobile: this.mobile,
                    email: this.email,
                    password: this.password,
                    password2: this.password2
                }, (errors, fields) => {
                    console.log(errors)
                    console.log(fields)
                    if(errors) {
                        console.log(errors[0].message)
                         /*validation failed, errors is an array of all errors
                         fields is an object keyed by field name with an array of
                         errors per field*/
//                        验证失败,错误是一个数组的所有错误字段是一个对象的字段名的数组每个字段错误
//                        return handleErrors(errors, fields);
                    }
                    // validation passed
                });
            }
        }
    }
</script>
<style>
    .btn{
        width: 100px;
        line-height: 36px;
        background-color: #007aff;
        color: #ffffff;
    }
</style>