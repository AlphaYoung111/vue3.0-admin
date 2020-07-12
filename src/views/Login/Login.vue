<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="currentIndex===index?'current':''"
          v-for="(item,index) in menuTab"
          :key="index"
          @click="btnClick(index)"
        >{{item.txt}}</li>
      </ul>
      <!-- from -->
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="300px"
        class="login-form"
        label-position="top"
        :rules="rules"
      >
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="ruleForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" minlength="8" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password" v-if="currentIndex===1">
          <el-input v-model="ruleForm.password" minlength="8" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="login-btn block" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { stripscript } from "@/utils/validate.js";
export default {
  data() {
    // 邮箱
    var validateEmail = (rule, value, callback) => {
      this.ruleForm.mail = stripscript(value);
      value = this.ruleForm.mail;
      let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!reg.test(value)) {
        callback(new Error("用户名格式错误"));
      } else {
        callback();
      }
    };
    //密码
    var validatePass = (rule, value, callback) => {
      this.ruleForm.pass = stripscript(value);
      value = this.ruleForm.pass;
      let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}/;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!reg.test(value)) {
        callback(new Error("密码为6-20位数字或字母"));
      } else {
        callback();
      }
    };

    // 确认
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    //验证码
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [{ txt: "登录" }, { txt: "注册" }],
      currentIndex: 0,
      ruleForm: {
        mail: "",
        pass: "",
        code: "",
        password: ""
      },
      rules: {
        mail: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },
  methods: {
    btnClick(i) {
      if (this.currentIndex !== i) {
        this.currentIndex = i;
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2rpx;
    cursor: pointer;
  }
  .current {
    background-color: rgba(97, 233, 70, 0.1);
  }
}
.login-form {
  .el-form-item {
    /deep/ .el-form-item__label {
      color: #fff;
    }
  }
  .block {
    display: block;
    width: 100%;
  }
}
</style>
