<template>
  <section>
    <el-row>
      <el-col :span="24">
        <!--表单-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="公司">
            <el-input v-model="formInline.user.name" placeholder="公司"></el-input>
          </el-form-item>


          <!-- <el-form-item label="年份">
            <el-date-picker
              v-model="formInline.user.date"
              align="right"
              type="year"
              placeholder="选择年份">
            </el-date-picker>
          </el-form-item> -->
        
         
          <el-button type="primary" @click="onSubmit(formInline.user.name)">查询</el-button>
          <el-button type="primary" @click="handleEdit(-1, -1)">添加</el-button>



          
          <a href="javascript:;" id="download" style="float: right;color: #169bd5;font-size: 14px;padding-top: 7px" @click="download()" download="download.csv">导出数据</a>
        </el-form>
        <!--表格-->
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column
            prop="date"
            label="注册日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="公司"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button type="primary" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

         <!-- <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
              :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div> -->

        <!-- <div align="center">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalCount">
              </el-pagination>
          </div> -->

           <div class="block">
              <!-- <span class="demonstration">完整功能</span> -->
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5,10, 20, 30, 40]"
                :page-size="pageSize"
                :page-count="pagecount"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
              </el-pagination>
            </div>




        <!-- <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="5"
            layout="prev, pager, next, jumper"
            :total="20">
          </el-pagination>
        </div> -->


      </el-col>
    </el-row>
    <el-dialog title="信息" v-model="dialogFormVisible" size="tiny">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="公司">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="注册日期">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;" ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave" :loading="editLoading">{{mybuttonname.name}}</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>





  </section>





</template>
<script type="text/ecmascript-6">

  import  tableData from '../static/data.json';

  const ERR_OK = "200";
  export default {
    data () {
      return {
        formInline: {
          user: {
            name: '',
            date: '',
            address: [],
            place: ''
          }
        },
        tableData: [],
        //请求的URL
        url:'http://localhost:3000/tableData',
        //搜索条件
        criteria: '',
        //默认每页数据量
        pageSize: 5,
    //默认每页数据量
        pagecount: 10,

        //默认高亮行数据id
        highlightId: -1,

        //当前页码
        currentPage: 1,

        //查询的页码
        start: 1,

        //默认数据总数
        totalCount: 1000,
        options: [],
        places: [],
        dialogFormVisible: false,
        editLoading: false,
        form: {
          name: '',
          address: '',
          date: '',
        },
        currentPage: 1,       
        table_index: 1,
        mybuttonname: {
          name: '修改'
        },
      };
    },
    created () {
      //this.tableData = tableData;
       //this.$http.get('/api/getTable').then((response) => {
         // this.$http.get('./static/data.json').then((response) => {       
      this.$http.get('http://localhost:3000/tableData?_start=0&_end=10').then((response) => {       
        if (response.status === 200) {
          
          console.log(response);
          var data = response.data ;
          this.totalCount = data.length;         



          this.tableData = response.data; 


          
          


        }
      });


      // this.loadData(this.criteria, this.currentPage, this.pagesize);


      // this.$http.get('/api/getOptions').then((response) => {
      //   response = response.data;
      //   if (response.code === ERR_OK) {
      //     this.options = response.datas;
      //     this.places = response.places;
      //   }
      // });



    },
    methods: {

    //从服务器读取数据  还未用
    loadData (criteria, pageNum, pageSize){  
                   console.log('loadData'); 
                      console.log(criteria); 
                    console.log(pageNum); 
                    console.log(pageSize); 
                                  
                    this.$http.get(this.url,{parameter:criteria, pageNum:pageNum, pageSize:pageSize}).then(function(res){
                      console.log(res.data.pagestudentdata);                         
                        console.log(res.data.number); 
                        this.tableData = res.data.pagestudentdata;
                        this.totalCount = res.data.number;
                        
                    },function(){
                        console.log('failed');
                    });                 
                },

      onSubmit (name) {


        //this.loadData(this.criteria, this.currentPage, this.pagesize);


         var where = ''  ;
         where = '/?name_like=' + name ;    
         this.$http.get('http://localhost:3000/tableData' + where ).then((response) => {       
          if (response.status === 200) { 
            var data = response.data ;
            this.totalCount = data.length;       
        
            this.tableData = response.data;          
          }
        });

      },

      handleDelete (index, row) {
        this.$http.delete('http://localhost:3000/tableData/' + row.id ).then((response) => {  
        if (response.status === 200) {
            this.tableData.splice(index, 1);
            this.$message({
               message: "操作成功！",
               type: 'success'
            });
        }
      });


      },
      handleEdit (index, row) {       
        this.dialogFormVisible = true;
        this.form = Object.assign({}, row);
        this.table_index = index; 
        this.mybuttonname.name = '保存';
      },
      handleSave () {
        this.$confirm('确认提交吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel'
        }).then(() => {
          this.editLoading = true;
          let date = this.form.date;
          if (typeof date === "object") {
            date = [date.getFullYear(), (date.getMonth() + 1), (date.getDate())].join('-');
            this.form.date = date
          }
//          this.tableData[this.table_index] = this.form;


           if (this.table_index === -1) {
             this.$http.post('http://localhost:3000/tableData/', 
           {     
              "name": this.form.name,
              "address": this.form.address,
              "date": this.form.date      

            }
          ).then((response) => {  
              if (response.status === 201) {
                  this.tableData.splice(0, 0, this.form);
                  this.$message({
                    message: "操作成功！",
                    type: 'success'
                  });
              }
            });


           } else {
                this.$http.put('http://localhost:3000/tableData/' + this.form.id, 
              {     
                  "name": this.form.name,
                  "address": this.form.address,
                  "date": this.form.date      

                }
              ).then((response) => {  
                  if (response.status === 200) {
                      this.tableData.splice(this.table_index, 1, this.form);
                      this.$message({
                        message: "操作成功！",
                        type: 'success'
                      });
                  }
                });
             
           }
          



           


          this.editLoading = false;
          this.dialogFormVisible = false;
        }).catch(() => {

        });
      },
      download: function() {
        var obj = document.getElementById('download');
        var str = "公司,注册日期,地址\n";
        for (var i = 0; i < this.tableData.length; i++) {
          var item = this.tableData[i];
          str += item.name + ',' + item.date + ',' + item.address;
          str += "\n";
        }
        str = encodeURIComponent(str);
        obj.href = "data:text/csv;charset=utf-8,\ufeff" + str;
        obj.download = "download.csv";
      },
      handleSizeChange(val) {
        this.pageSize = val ;

        // console.log(`每页 ${val} 条`);
        // this.$http.get('http://localhost:3000/tableData?_start=0&_end=10').then((response) => {       
        //   if (response.status === 200) {
        //     this.tableData = response.data;          
        //   }
        // });


      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
        var start = (val -1) *  this.pageSize ;
        var endpage = val  * this.pageSize;

        console.log(`start: ${start}`);  
        console.log(`endpage: ${endpage}`);  
        
              
      
        this.$http.get(`http://localhost:3000/tableData?_start=${start}&_end=${endpage}`).then((response) => {       
          if (response.status === 200) {
            this.tableData = response.data;          
          }
        });

      }
    }
  };
</script>
<style>
  .el-pagination {
    text-align: center;
    margin-top: 30px;
  }
  .el-message-box__btns .cancel {
    float: right;
    margin-left: 10px;
  }
  .footer1{
	height: 50px;
	width: 100%;
	background-color: #FFFFFF;
	line-height: 50px;
	text-align: center;
	box-sizing: border-box;
	border-top: 1px solid #CCCCCC;
  bottom: 0 ;
  }




</style>
