export const membershipPlans = [
    { id: "adult", title: "Adult gym membership", note: "", price: "£31.99", signup_fee: "+ £10 sign-up fee", url: "https://pay.gocardless.com/AL0003D34T07AQ", image: "/images/photo-7.jpg" },
    { id: "junior", title: "Junior gym membership", note: "16 years and under", price: "£19.99", signup_fee: "+ £10 sign-up fee", url: "https://pay.gocardless.com/AL0003D34ZW7J2", image: "/images/photo-5.jpg" },
    { id: "oap", title: "O.A.P. gym membership", note: "65 years and above", price: "£24.99", signup_fee: "+ £10 sign-up fee", url: "https://pay.gocardless.com/AL0003D34YPRBE", image: "/images/photo-16.jpg" },
    { id: "student", title: "Student gym membership", note: "", price: "£24.99", signup_fee: "+ £10 sign-up fee", url: "https://pay.gocardless.com/AL0003D34YPRBE", image: "/images/photo-8.jpg" },
    { id: "double-adult", title: "Double adult gym membership", note: "", price: "£55.00", signup_fee: "+ £10 sign-up fee", url: "https://pay.gocardless.com/AL0003D352X5DY", image: "/images/photo-12.jpg" },
    { id: "adult-child", title: "Adult + child gym membership", note: "", price: "£47.00", signup_fee: "+ £10 sign-up fee", url: "https://pay.gocardless.com/AL00047A07S6FK", image: "/images/photo-6.jpg" },
    { id: "blue-light", title: "Blue light & forces gym membership", note: "", price: "£24.99", signup_fee: "+ £10 sign-up fee", url: "https://pay.gocardless.com/AL000417K15V6W", image: "/images/photo-11.jpg" },
]

export function getMembershipPlan(id) {
    return membershipPlans.find((plan) => plan.id === id) || null
}
