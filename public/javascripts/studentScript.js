function studentPanel(){
    var details=document.querySelector("#details")
    details.addEventListener("click",function(){
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
        gsap.to("#details ",{
            color:"#111",
            duration:0.5
        })
    })
    var attendance=document.querySelector("#attendance")
    attendance.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#panel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#attendance",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#attendance ",{
            color:"#111",
            duration:0.5
        })
    })
    var leaveRequest=document.querySelector("#leaveRequest")
    leaveRequest.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#panel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#leaveRequestBox",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#leaveRequest",{
            color:"#111",
            duration:0.5
        })
    })
    var marks=document.querySelector("#marks")
    marks.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#panel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#marks",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#marks",{
            color:"#111",
            duration:0.5
        })
    })
    var editDetails=document.querySelector("#editDetails")
    editDetails.addEventListener("click",function(){
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
        gsap.to("#editDetails ",{
            color:"#111",
            duration:0.5
        })
    })
    var changePassword=document.querySelector("#changePassword")
    changePassword.addEventListener("click",function(){
        gsap.to(".part",{
            display:'none',
            duration:0.5,
        })
        gsap.to("#panel h2",{
            color:"#4E3629",
            duration:0.5
        })
        gsap.to("#changePasswordBox",{
            display:'flex',
            duration:0.5,
        })
        gsap.to("#changePassword",{
            color:"#111",
            duration:0.5
        })
    })
}
studentPanel()
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
    })
}
leavePanel()