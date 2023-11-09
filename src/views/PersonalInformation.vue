<template>
  <div class="show-container">
    <div class="text">个人信息</div>
    <hr />
    <br />
    <div style="display: block" class="student">
      <div class="left">
        <img
          class="passport"
          :src="student.avatar"
          alt="未上传证件照或图片加载有误，请刷新"
        />
        <br />
        <el-button class="uploadPassport">上传证件照</el-button>
      </div>
      <div class="right">
        <div class="box">
          <div class="littleTitle">基本信息</div>
          <div class="infoBox">
            <el-row class="infoRow">
              <el-col :span="7">
                <div>
                  <span class="tag">学生姓名 :</span
                  ><span>{{ student.name }}</span>
                </div></el-col
              >
              <el-col :span="7">
                <div>
                  <span class="tag">学生学号 :</span
                  ><span>{{ student.id }}</span>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <span class="tag">身份证号 :</span
                  ><span>{{ student.card }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="infoRow">
              <el-col :span="7">
                <div>
                  <span class="tag">联系电话 :</span
                  ><span>{{ student.phone }}</span>
                </div></el-col
              >
              <el-col :span="7">
                <div>
                  <span class="tag">学生性别 :</span
                  ><span>{{ student.sex }}</span>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <span class="tag">学生班级 :</span
                  ><span>{{ student.class }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <hr />
        <br>
        <div class="box">
          <div class="littleTitle">其他信息</div>
          <div class="infoBox">
            <el-row class="infoRow">
              <el-col :span="7">
                <div>
                  <span class="tag">政治面貌 :</span
                  ><span>{{ student.name }}</span>
                </div></el-col
              >
              <el-col :span="7">
                <div>
                  <span class="tag">目标学校 :</span
                  ><span>{{ student.school }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="infoRow">
              <el-col :span="7">
                <div>
                  <span class="tag">民族 :</span
                  ><span>{{ student.ethnicity }}</span>
                </div></el-col
              >
              <el-col :span="7">
                <div>
                  <span class="tag">来源省份 :</span
                  ><span>{{ student.province }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="infoRow">
              <el-col :span="7">
                <div>
                  <span class="tag">科类 :</span
                  ><span>{{ student.category }}</span>
                </div></el-col
              >
              <el-col :span="7">
                <div>
                  <span class="tag">性质计划 :</span
                  ><span>{{ student.nature }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="infoRow">
              <el-col :span="7">
                <div>
                  <span class="tag">选考科目 :</span
                  ><span>{{ student.subjects }}</span>
                </div></el-col
              >
            </el-row>
          </div>
        </div>
        <hr />
        <br>
        <div class="box">
          <div class="littleTitle">收件信息</div>
          <div class="infoBox">
            <el-row class="infoRow">
              <el-col :span="24">
                <div>
                  <span class="tag">家庭地址 :</span
                  ><span>{{ student.address }}</span>
                </div></el-col
              >
            </el-row>
            <br />
            <el-row class="infoRow">
              <el-col :span="2">
                <div>
                  <span class="tag">收件地址 :</span>
                </div></el-col
              >
              <el-col :span="10">
                <div style="background-color: rgba(224, 230, 230, 0.438)">
                  <br />
                  <el-row class="infoRow">
                    <el-col :span="24">
                      <div>
                        <span class="tag">收件人 :</span
                        ><span>{{ student.recipient }}</span>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row class="infoRow">
                    <el-col :span="24">
                      <div>
                        <span class="tag">收件电话 :</span
                        ><span>{{ student.phone2 }}</span>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row class="infoRow">
                    <el-col :span="24">
                      <div>
                        <span class="tag">详细地址 :</span
                        ><span>{{ student.address }}</span>
                      </div>
                    </el-col>
                  </el-row>
                  <br />
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <el-button type="primary" class="changeInfo">修改资料</el-button>
      </div>
    </div>
    <div style="display: none" class="teacher">
        <div class="box">
          <div class="littleTitle">基本信息</div>
          <div class="infoBox">
            <el-row class="infoRow">
              <el-col :span="7">
                <div>
                  <span class="tag">教师姓名 :</span
                  ><span>{{ teacher.name }}</span>
                </div></el-col
              >
              <el-col :span="7">
                <div>
                  <span class="tag">教师编号 :</span
                  ><span>{{ teacher.id }}</span>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <span class="tag">身份证号 :</span
                  ><span>{{ teacher.card }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="infoRow">
              <el-col :span="7">
                <div>
                  <span class="tag">联系电话 :</span
                  ><span>{{ teacher.phone }}</span>
                </div></el-col
              >
              <el-col :span="7">
                <div>
                  <span class="tag">性别 :</span
                  ><span>{{ teacher.sex }}</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <hr />
        <br>
        <div class="box">
          <div class="littleTitle">其他信息</div>
          <div class="infoBox">
            <el-row class="infoRow">
              <el-col :span="7">
                <div>
                  <span class="tag">负责班级 :</span
                  ><span>{{ teacher.manageClass }}</span>
                </div></el-col
              >
            </el-row>
            <el-row class="infoRow">
              <el-col :span="7">
                <div>
                  <span class="tag">授课班级 :</span
                  ><span>{{ teacher.teachClass }}</span>
                </div></el-col
              >
            </el-row>
          </div>
        </div>
        <br>
        <el-button type="primary" class="changeInfo">修改资料</el-button>
      </div>
    </div>
</template>
<script setup>
let student = {
  avatar:"https://img.zcool.cn/community/01cf695e71cda9a80120a8953bb057.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_1280,limit_1/sharpen,100",
  name: "付小小",
  id: "415567569789",
  card: "365124200103052214",
  phone: "1385 2222 222",
  sex: "女",
  class: "2023级预科1班",
  politics: "共青团员",
  school: "湘南学院",
  ethnicity: "土家族",
  province: "湖南省",
  category: "普通类（首选物理）",
  nature: "国家计划",
  subjects: "化学+地理",
  recipient: "小付",
  phone2: "128 0000 000",
  address: "湖南省张家界市永定区大庸桥街道吉首大学张家界校区",
};
let teacher = {
  name:"杨世博",
  id:"43251648512",
  card:"51000000000000000X",
  phone:"1810 0000 000",
  sex:"男",
  manageClass:"2022级预科1班",
  teachClass:"2022级预科1班、2022级预科4班"
}
</script>
<style src="@/assets/css/show-container.css" scoped></style>
<style scoped>
hr {
  border-color: #ebf3ff4d;
}
.student {
  overflow: auto; /* 清除浮动 */
}
.left {
  width: 10%;
  display: flex;
  align-items: center;
  flex-direction: column;
  float: left;
}
.passport {
  width: 100%;
  height: 90%;
}
.uploadPassport {
  width: 80%;
}
.right {
  width: 88%;
  display: flex;
  flex-direction: column;
  float: right;
}
.littleTitle {
  margin-bottom: 30px;
  font-weight: 1000;
}
.tag {
  display: inline-block;
  margin-right: 15px;
  width: 100px;
  text-align: right;
}
.infoBox {
  margin-left: 10px;
  margin-bottom: 30px;
}
.infoRow {
  margin-bottom: 15px;
}
.changeInfo{
  width: 100px;
  margin-top: 40px;
  margin-left:90%;
  margin-bottom: 40px;
}

.teacher {
  overflow: auto; /* 清除浮动 */
}
</style>
  