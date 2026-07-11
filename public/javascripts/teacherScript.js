function teacherPanel(){
    var tp1=document.querySelector("#tp1")
    tp1.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#panel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#personalInformation",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#tp1 ",{
            color:"#111",
            duration:0.5
        })
        // Save state to localStorage
        localStorage.setItem('teacherActivePanel', 'personalInformation');
        localStorage.setItem('teacherActiveButton', 'tp1');
    })
    var tp2=document.querySelector("#tp2")
    tp2.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#panel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#studentInformation",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#tp2 ",{
            color:"#111",
            duration:0.5
        })
        // Save state to localStorage
        localStorage.setItem('teacherActivePanel', 'studentInformation');
        localStorage.setItem('teacherActiveButton', 'tp2');
    })
    var tp3=document.querySelector("#tp3")
    tp3.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#panel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#exams",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#tp3 ",{
            color:"#111",
            duration:0.5
        })
        // Save state to localStorage
        localStorage.setItem('teacherActivePanel', 'exams');
        localStorage.setItem('teacherActiveButton', 'tp3');
    })
    var tp4=document.querySelector("#tp4")
    tp4.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#panel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#leaveRequest",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#tp4 ",{
            color:"#111",
            duration:0.5
        })
        // Save state to localStorage
        localStorage.setItem('teacherActivePanel', 'leaveRequest');
        localStorage.setItem('teacherActiveButton', 'tp4');
    })
    var tp5=document.querySelector("#tp5")
    tp5.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#panel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#editDetails",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#tp5 ",{
            color:"#111",
            duration:0.5
        })
        // Save state to localStorage
        localStorage.setItem('teacherActivePanel', 'editDetails');
        localStorage.setItem('teacherActiveButton', 'tp5');
    })
    var tp6=document.querySelector("#tp6")
    tp6.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#panel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#changePassword",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#tp6 ",{
            color:"#111",
            duration:0.5
        })
        // Save state to localStorage
        localStorage.setItem('teacherActivePanel', 'changePassword');
        localStorage.setItem('teacherActiveButton', 'tp6');
    })
}
teacherPanel()
function leavePanel(){
    var apply=document.querySelector("#apply")
    apply.addEventListener("click",function(){
        gsap.to(".request",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#applyLeave",{
            display:'flex',
            duration:0.5,
        })
        // Save sub-panel state
        localStorage.setItem('teacherActiveSubPanel', 'applyLeave');
    })
    var view=document.querySelector("#view")
    view.addEventListener("click",function(){
        gsap.to(".request",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#viewLeave",{
            display:'flex',
            duration:0.5,
        })
        // Save sub-panel state
        localStorage.setItem('teacherActiveSubPanel', 'viewLeave');
    })
    var approve=document.querySelector("#approve")
    approve.addEventListener("click",function(){
        gsap.to(".request",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#approveLeave",{
            display:'flex',
            duration:0.5,
        })
        // Save sub-panel state
        localStorage.setItem('teacherActiveSubPanel', 'approveLeave');
    })
}
leavePanel()
function studentPanel(){
    var ts1=document.querySelector("#ts1");
    ts1.addEventListener("click",function(){
        gsap.to(".studentInfo2",{
            display:"none"
        })
        gsap.to("#studentInfo",{
            display:"flex"
        })
        // Save sub-panel state
        localStorage.setItem('teacherActiveSubPanel', 'studentInfo');
    })
    var ts3=document.querySelector("#ts3");
    ts3.addEventListener("click",function(){
        gsap.to(".studentInfo2",{
            display:"none"
        })
        gsap.to("#studentDelete",{
            display:"flex"
        })
        // Save sub-panel state
        localStorage.setItem('teacherActiveSubPanel', 'studentDelete');
    })
}
studentPanel()
function examPanel(){
    var ep2=document.querySelector("#ep2");
    ep2.addEventListener("click",function(){
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
        // Save sub-panel state
        localStorage.setItem('teacherActiveSubPanel', 'marks');
    })
}
examPanel()
function marksPanel(){
    var mp1=document.querySelector("#mp1");
    mp1.addEventListener("click",function(){
        gsap.to("#marksPanel",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".marksElem",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#marksBox",{
            display:"flex",
            duration:0.5,
        })
        gsap.to("#viewMarks",{
            display:'flex',
            duration:0.5,
        })
        // Save sub-panel state
        localStorage.setItem('teacherActiveSubPanel', 'viewMarks');
    })
    var mp2=document.querySelector("#mp2");
    mp2.addEventListener("click",function(){
        gsap.to("#marksPanel",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".marksElem",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#marksBox",{
            display:"flex",
            duration:0.5,
        })
        gsap.to("#uploadMarks",{
            display:'flex',
            duration:0.5,
        })
        // Save sub-panel state
        localStorage.setItem('teacherActiveSubPanel', 'uploadMarks');
    })
}
function marksViewPanel(){
    var vp1=document.querySelector("#vp1");
    vp1.addEventListener("click",function(){
        gsap.to("#marksViewPanel",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".report",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#viewMarksBox",{
            display:"flex",
            duration:0.5,
        })
        gsap.to("#classReport",{
            display:'flex',
            duration:0.5,
        })
        // Save sub-panel state
        localStorage.setItem('teacherActiveSubPanel', 'classReport');
    })
    var vp2=document.querySelector("#vp2");
    vp2.addEventListener("click",function(){
        gsap.to("#marksViewPanel",{
            display:'none',
            duration:0.5,
        })
        gsap.to(".report",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#viewMarksBox",{
            display:"flex",
            duration:0.5,
        })
        gsap.to("#studentReport",{
            display:'flex',
            duration:0.5,
        })
        // Save sub-panel state
        localStorage.setItem('teacherActiveSubPanel', 'studentReport');
    })
}
marksPanel()
marksViewPanel()
function approve(){
    var buttons = document.querySelectorAll("#leaveInfo button");
    buttons.forEach(function(button){
        button.addEventListener("click",function(){
            gsap.to("#leaveInfo button",{
                innerText:"APPROVED",
                backgroundColor:"green"
            })
        })
    })
}
approve()

// State restoration function
function restoreTeacherState() {
    // Restore main panel state
    var activePanel = localStorage.getItem('teacherActivePanel');
    var activeButton = localStorage.getItem('teacherActiveButton');
    
    if (activePanel && activeButton) {
        // Hide all parts first
        gsap.set(".part", { display: 'none' });
        gsap.set("#panel h2", { color: "#4E3629" });
        
        // Show the active panel
        gsap.set(`#${activePanel}`, { display: 'flex' });
        gsap.set(`#${activeButton}`, { color: "#111" });
    }
    
    // Restore sub-panel state
    var activeSubPanel = localStorage.getItem('teacherActiveSubPanel');
    if (activeSubPanel) {
        // Hide all sub-panels first
        gsap.set(".request", { display: 'none' });
        gsap.set(".studentInfo2", { display: 'none' });
        gsap.set(".exams", { display: 'none' });
        gsap.set(".marksElem", { display: 'none' });
        gsap.set("#marksViewPanel", { display: 'none' });
        gsap.set(".report", { display: 'none' });
        gsap.set("#marksBox", { display: 'none' });
        gsap.set("#viewMarksBox", { display: 'none' });
        
        // Show the active sub-panel
        gsap.set(`#${activeSubPanel}`, { display: 'flex' });
        
        // Special handling for exam panels
        if (activeSubPanel === 'datesheetUpload' || activeSubPanel === 'marks') {
            gsap.set("#examBox", { display: 'flex' });
        }
        
        // Special handling for marks panels
        if (activeSubPanel === 'viewMarks' || activeSubPanel === 'uploadMarks') {
            gsap.set("#marksBox", { display: 'flex' });
        }
        
        // Special handling for marks view panels
        if (activeSubPanel === 'classReport' || activeSubPanel === 'studentReport') {
            gsap.set("#viewMarksBox", { display: 'flex' });
        }
    }
}

// Restore state when page loads
document.addEventListener('DOMContentLoaded', function() {
    restoreTeacherState();
});
