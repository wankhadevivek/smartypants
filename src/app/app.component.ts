import { Component, OnInit } from '@angular/core';
import { SharedService } from "./service/shared.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  td:any;
  userData:any =[];
  empData:any[]=[];
  postData: any;
  myForm: any;
  showData: boolean = false;
  editIndex: any;
  idNew: any;
  emailNew: any;
  firstNameNew: any;
  lastNameNew: any;
  userId: any;
  showAddButtonFlag:boolean=true;
  showUpdateButtonFlag:boolean=false;
  
  constructor(private ser:SharedService){}

  ngOnInit(): void {
     this.getData1();
     this.getData2();
     this.sendData();
     
   }

   
  onSubmitForm(frm:any){
    console.log(frm.value);
  }


  getData1(){
    this.ser.getBackData1().subscribe((res:any)=>{
      this.userData = res;
      this.userData['data'].forEach((item:any)=>
        {
           this.empData.push(item);
        })
      console.log(res);
        })
  }

  getData2(){
    this.ser.getBackData2().subscribe((res:any)=>{
      this.userData = res;
      this.userData['data'].forEach((item:any)=>
      {
         this.empData.push(item);
      })
      console.log("empData",this.empData);
        })
  }

  addUser(frm:any) {
    console.log(frm.value);
    this.empData.push(frm.value); 
    this.sendData();

    this.idNew="";
    this.emailNew="";
    this.firstNameNew="";
    this.lastNameNew="";
    
  
  }

  sendData() {
    this.postData =
    {
      "id":this.idNew,
      "email":this.emailNew,
      "first_name":this.firstNameNew,
      "last_name":this.lastNameNew
      
      
    }
    this.ser.sendData(this.postData).subscribe(
      (res: any) => {
         console.log(res);
      }
    )
  }

  editUser(e: any) {
    //  console.log(e);  //print select to edit in console
    this.showAddButtonFlag=false;
    this.showUpdateButtonFlag=true;
    this.idNew = e.id;
    this.emailNew = e.email;
    this.firstNameNew = e.first_name;
    this.lastNameNew = e.last_name;
    
    this.editIndex = this.empData.indexOf(e)
  }

  //Update

  updateUser(myForm1: any) {
    this.showAddButtonFlag=true;
    this.showUpdateButtonFlag=false;
    console.log(myForm1.value);
    let obj = {
      Id: this.myForm,
      Email: this.myForm,
      Name: this.myForm,
      UsearName: this.myForm,
    }
    // var userId = this.userData.id
    this.ser.updateData(this.userId, obj).subscribe(
      (res: any) => {
        console.log(res);
        this.idNew="";
        this.emailNew="";
        this.firstNameNew="";
        this.lastNameNew="";
        
        this.empData.splice(this.editIndex, 1, myForm1.value);
      }
    )

  }

  delData(x: any) {
    this.ser.delData(this.userId).subscribe(
      (res: any) => {
        console.log(res);
        this.empData.forEach((element: any) => {
          // console.log(element);
          if (x.name == element.name) {
            //  console.log(dat);    it prints deleted row in console
            this.empData.splice(this.empData.indexOf(x), 1)
          }

        });
      }
    )
  }
}
