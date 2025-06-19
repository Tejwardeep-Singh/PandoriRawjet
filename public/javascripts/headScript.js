function headPanel(){
    var hp1=document.querySelector("#hp1")
    hp1.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".panel_elem a",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#personalInformation",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#hp1 a",{
            color:"white",
            duration:0.5
        })
    })
    var hp2=document.querySelector("#hp2")
    hp2.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".panel_elem a",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#teacherInformation",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#hp2 a",{
            color:"white",
            duration:0.5
        })
    })
    var hp3=document.querySelector("#hp3")
    hp3.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".panel_elem a",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#studentInformation",{
            display: 'flex',
            duration:0.5,
        })
        gsap.to("#hp3 a",{
            color:"white",
            duration:0.5
        })
    })
    var hp4=document.querySelector("#hp4")
    hp4.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".panel_elem a",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#leaveRequest",{
            display: 'flex',
            duration:0.5,
        })
        gsap.to("#hp4 a",{
            color:"white",
            duration:0.5
        })
    })
    var hp5=document.querySelector("#hp5")
    hp5.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".panel_elem a",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#editDetails",{
            display: 'flex',
            duration:0.5,
        })
        gsap.to("#hp5 a",{
            color:"white",
            duration:0.5
        })
    })
    var hp6=document.querySelector("#hp6")
    hp6.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".panel_elem a",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#changePassword",{
            display: 'flex',
            duration:0.5,
        })
        gsap.to("#hp6 a",{
            color:"white",
            duration:0.5
        })
    })
    var hp7=document.querySelector("#hp7")
    hp7.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".panel_elem a",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#exams",{
            display: 'flex',
            duration:0.5,
        })
        gsap.to("#hp7 a",{
            color:"white",
            duration:0.5
        })
    })
    var hp8=document.querySelector("#hp8")
    hp8.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".panel_elem a",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#admin",{
            display: 'flex',
            duration:0.5,
        })
        gsap.to("#hp8 a",{
            color:"white",
            duration:0.5
        })
    })

}
var toggle = 0;
var toggle2 = 0;
headPanel()
function teacherPanel(){
    var tp1=document.querySelector("#tp1")
    tp1.addEventListener("click",function(){
        gsap.to(".teacherInfo",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#teacherPanel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#teacherInfo",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#tp1 ",{
            color:"#111",
            duration:0.5
        })
    })
    var tp2=document.querySelector("#tp2")
    tp2.addEventListener("click",function(){
        gsap.to(".teacherInfo",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#teacherPanel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#teacherAdd",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#tp2 ",{
            color:"#111",
            duration:0.5
        })
    })
    var tp3=document.querySelector("#tp3")
    tp3.addEventListener("click",function(){
        gsap.to(".teacherInfo",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#teacherPanel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#teacherRemove",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#tp3 ",{
            color:"#111",
            duration:0.5
        })
    })

}
teacherPanel()
function examPanel(){
    var ep1=document.querySelector("#ep1");
    ep1.addEventListener("click",function(){
        gsap.to("#examPanel h2",{
            color:"#4E3629",
            duration:0.5,
        })
        gsap.to(".exams",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#examBox",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#datesheet",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#datesheetInput",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#examPanel h2",{
            color:"white",
            duration:0.5,
        })
    })
    var ep2=document.querySelector("#ep2");
    ep2.addEventListener("click",function(){
        gsap.to("#examPanel h2",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".exams",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#examBox",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#marks",{
            display:'flex',
            duration:0.5,
        })
    })
}
examPanel()
function admin(){
    var ap1= document.querySelector("#ap1");
    ap1.addEventListener("click",function(){
        gsap.to(".admin",{
            display:"none",
        })
        gsap.to("#subject",{
            display:"flex",
        })
    }) 
    var ap2= document.querySelector("#ap2");
    ap2.addEventListener("click",function(){
        gsap.to(".admin",{
            display:"none",
        })
        gsap.to("#class",{
            display:"flex",
        })
    }) 
    var ap3= document.querySelector("#ap3");
    ap3.addEventListener("click",function(){
        gsap.to(".admin",{
            display:"none",
        })
        gsap.to("#addSubjectClass",{
            display:"flex",
        })
    })
    var ap4= document.querySelector("#ap4");
    ap4.addEventListener("click",function(){
        gsap.to(".admin",{
            display:"none",
        })
        gsap.to("#assignTeacher",{
            display:"flex",
        })
    })
}
admin()
function approve(){
var button = document.querySelector("#leaveInfo button");
button.addEventListener("click",function(){
    gsap.to("#leaveInfo button",{
        innerText:"APPROVED",
        backgroundColor:"green"
    })
})
}
approve()

