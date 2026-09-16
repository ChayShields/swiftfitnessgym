import { membershipPlans } from "./membership-plans"

export const navbarDefaults = {
    brand: {
        logo: "/logo.png",
        logo_alt: "SwiftFitness Gym",
        name: "SwiftFitness",
        place: "Earsham",
    },
    links: {
        items: [
            { title: "Home", full_title: "", url: "/" },
            { title: "About", full_title: "", url: "/about" },
            { title: "Therapy", full_title: "Sports Therapy / Massage / Sun Beds", url: "/sunbeds-services" },
            { title: "Reviews", full_title: "", url: "/reviews" },
            { title: "Contact", full_title: "", url: "/contact" },
        ],
    },
    contact: {
        phone: "01986 893480",
        phone_link: "tel:01986893480",
        email: "info.swiftfitness@gmail.com",
        email_link: "mailto:info.swiftfitness@gmail.com",
        join_button: { text: "Join Now", url: "/gym-membership" },
    },
    seo: {
        site_title: "SwiftFitness Gym",
        site_description: "SwiftFitness. The family run gym with you in mind! Adult memberships from £31.99 a month and no contracts.",
    },
}

export const footerDefaults = {
    details: {
        logo: "/logo.png",
        address_heading: "Address",
        address: "Earsham Mill Estate, Earsham, NR35 2TQ",
        opening_hours: "Open 7 days a week, all hours",
        email: "info.swiftfitness@gmail.com",
        email_link: "mailto:info.swiftfitness@gmail.com",
        phone: "01986 893480",
        phone_link: "tel:01986893480",
        copyright: "© SwiftFitness Gym {year}. All rights reserved.",
    },
    page_links: {
        heading: "SwiftFitness",
        items: [
            { label: "About", url: "/about" },
            { label: "Sports Therapy / Massage / Sun Beds", url: "/sunbeds-services" },
            { label: "Reviews", url: "/reviews" },
            { label: "Gym Membership", url: "/gym-membership" },
            { label: "Swift Ink Tattoo", url: "/swift-ink-tattoo" },
        ],
    },
    legal_links: {
        heading: "Legal",
        items: [
            { label: "Terms of membership", url: "/terms" },
            { label: "Privacy policy", url: "/privacy-policy" },
            { label: "Cookie policy", url: "/cookie-policy" },
        ],
    },
    socials: {
        items: [
            { label: "Facebook", url: "https://www.facebook.com/swiftfitnessgym" },
            { label: "Instagram", url: "https://www.instagram.com/swiftfitness.gym/" },
        ],
    },
}

export const homeDefaults = {
    seo: {
        seo_title: "SwiftFitness Gym | The family run gym with you in mind",
        seo_description: "SwiftFitness. The family run gym with you in mind! Adult memberships from £31.99 a month and no contracts.",
    },
    hero: {
        video_url: "/videos/hero.mp4",
        poster: "/images/photo-7.jpg",
        headline: "SWIFTFITNESS",
        subhead: "The family run gym with you in mind. Here to help you achieve your fitness goals.",
        body: "Adult memberships from £31.99 a month and no contracts. Other membership options ranging from O.A.P, student, blue light & forces and joint membership available.",
        primary_button: { text: "Join Now", url: "/gym-membership" },
        secondary_button: { text: "About us", url: "/about" },
    },
    membership: {
        kicker: "Membership",
        heading: "No contracts.",
        body: "We believe in the value of community and strive to support local Waveney Valley residents in achieving their fitness goals in a safe, clean and welcoming space. Apply within and join SwiftFitness.",
        button: { text: "See memberships", url: "/gym-membership" },
        image: "/images/photo-6.jpg",
        image_alt: "Cardio area at SwiftFitness Gym",
        inset_image: "/images/swift-1.jpg",
        inset_image_alt: "Weights floor at SwiftFitness Gym",
    },
    trial: {
        image: "/images/photo-12.jpg",
        image_alt: "Dumbbell racks at SwiftFitness Gym",
        kicker: "Try us first",
        heading: "Free trial session",
        body: "We know finding the right gym is important. That's why we offer anyone a free trial session. A chance to have a look around, try it out, meet us and ask any questions you might have. Contact us and arrange a day and time.",
        button: { text: "Book a trial", url: "/contact" },
    },
    inside: {
        kicker: "The gym",
        heading: "Inside SwiftFitness",
        button: { text: "See the facilities", url: "/about" },
        video_url: "/videos/hero.mp4",
        poster: "/images/photo-7.jpg",
    },
    gallery: {
        items: [
            { image: "/images/photo-6.jpg", wide: true },
            { image: "/images/photo-16.jpg", wide: false },
            { image: "/images/photo-11.jpg", wide: false },
            { image: "/images/photo-8.jpg", wide: false },
            { image: "/images/photo-5.jpg", wide: false },
        ],
    },
    quote: {
        image: "/images/photo-6.jpg",
        text: "There is nothing impossible to those who will try.",
    },
}

export const aboutDefaults = {
    seo: {
        seo_title: "About | SwiftFitness Gym",
        seo_description: "Established in 2020 by Ian and Derek Swift, SwiftFitness Gym is the newest independent fitness venue in the Waveney Valley.",
    },
    hero: {
        breadcrumb: "About",
        image: "/images/photo-7.jpg",
        kicker: "About",
        title: "The newest independent fitness venue in the Waveney Valley.",
    },
    story: {
        paragraph_1: "Established in 2020 by Ian and Derek Swift. With over 30 years devoted to gym training and sports therapy we've amassed a wealth of real-world experience in the ever evolving fitness industry.",
        paragraph_2: "Community and inclusivity is at the core of what we do. The SwiftFitness gym, studio and cafe have been created together to offer a safe, welcoming and vibrant space for all members. From those just beginning their journey into fitness to hardened workout Spartans, we are here to help you achieve your goals, big or small.",
        paragraph_3: "We are available to create individually tailored training programmes but equally happy to let you follow your own path, with the occasional bit of advice or training tip thrown in if requested.",
        what3words_prefix: "Find us on what3words:",
        what3words_label: "///lotteries.scarecrow.bibs",
        what3words_url: "https://what3words.com/lotteries.scarecrow.bibs",
        photo: "/images/swift-5.jpg",
        photo_alt: "Ian and Derek Swift at SwiftFitness Gym",
    },
    space: {
        heading: "The Space",
        items: [
            { title: "The gym floor", text: "Fully conditioned, non-recycled, fresh air ventilation", image: "/images/photo-7.jpg" },
            { title: "The studio", text: "Bespoke-built studio with sprung floor and state of the art lighting", image: "/images/photo-8.jpg" },
            { title: "Treatment rooms", text: "Individual therapeutic treatment rooms including UV sunbed", image: "/images/photo-1.jpg" },
            { title: "Changing rooms", text: "Changing rooms and showers", image: "/images/photo-15.jpg" },
        ],
    },
    equipment: {
        heading: "Training Equipment",
        cardio_image: "/images/photo-16.jpg",
        cardio_image_alt: "Cardio equipment at SwiftFitness Gym",
        cardio_heading: "Cardio",
        resistance_image: "/images/photo-11.jpg",
        resistance_image_alt: "Free weights at SwiftFitness Gym",
        resistance_heading: "Resistance & Weights",
        cardio_items: [
            { item: "Crossfit stations x 3" },
            { item: "2 x Concept 2 rower" },
            { item: "5 x treadmills" },
            { item: "1 x dual fit Schwinn bike" },
            { item: "1 x upright bike" },
            { item: "Concept 2 ski erg" },
            { item: "1 x stair climber" },
            { item: "2 x cross trainers" },
        ],
        resistance_items: [
            { item: "45° hammer strength leg press" },
            { item: "Iso lateral hammer strength leg press" },
            { item: "Leverage squat machine" },
            { item: "2 x pull down" },
            { item: "2 x seated shoulder press" },
            { item: "Seated pec dec" },
            { item: "Seated calf raise" },
            { item: "2 x cable crossovers" },
            { item: "Lay down iso lateral raise" },
            { item: "Hyperextension" },
            { item: "Abductor / adductor" },
            { item: "Dip bar" },
            { item: "Battle ropes" },
            { item: "Seated arm curl" },
            { item: "Seated low row" },
            { item: "Sled run on 13 metres track" },
            { item: "Seated leg extension & hamstring curl" },
            { item: "Flat, incline & decline olympic benches" },
            { item: "Dumbbells 2kg – 50kg" },
            { item: "Assortment of olympic weights & olympic bars" },
            { item: "Tru-Squat" },
            { item: "Smiths machine" },
            { item: "Standing calf raise" },
            { item: "Seated pullover" },
        ],
    },
    quote: {
        image: "/images/photo-12.jpg",
        text: "Nothing better. Absolutely 100% recommendation. Ian and Derek are great people and go along perfectly with the friendly and strong community they have built around the gym. Keep it up and I truly recommend the gym to all people, new or veteran.",
    },
}

export const therapyDefaults = {
    seo: {
        seo_title: "Sports Therapy / Massage / Sun Beds | SwiftFitness Gym",
        seo_description: "Book a sports massage or enquire about our sun beds at SwiftFitness Gym.",
    },
    hero: {
        breadcrumb: "Sports Therapy / Massage / Sun Beds",
        image: "/images/photo-1.jpg",
        kicker: "Treatments",
        title: "Sports Therapy / Massage / Sun Beds",
    },
    massage: {
        heading: "Book a sports massage",
        body: "Get in touch about booking a sports massage. Fill in the form and we'll get back to you as soon as possible.",
        image_1: "/images/photo-2.jpg",
        image_1_alt: "Sports therapy treatment room",
        image_2: "/images/swift-14.jpg",
        image_2_alt: "Massage treatment room at SwiftFitness",
    },
    sunbeds: {
        heading: "Sun Beds",
        image: "/images/photo-4.jpg",
        image_alt: "Hapro sunbed at SwiftFitness Gym",
        body_1: "If you are interested in using our sunbed and aren't already a member, please email us with your details and attach a clear photo of yourself for our facial recognition system to be able to let you in.",
        email: "info.swiftfitness@gmail.com",
        email_link: "mailto:info.swiftfitness@gmail.com",
        body_2: "Our sunbed prices are from 37p per minute and we offer deals from 3 minutes to 120 minutes. We have suncreams available in the office.",
    },
    quote: {
        image: "/images/photo-3.jpg",
        text: "Brilliant for regular gym users and newbies alike. Excellent facilities and lovely staff.",
    },
}

export const reviewsDefaults = {
    seo: {
        seo_title: "Reviews | SwiftFitness Gym",
        seo_description: "Have a look and see what people are saying about SwiftFitness Gym.",
    },
    hero: {
        breadcrumb: "Reviews",
        image: "/images/swift-5.jpg",
        kicker: "Reviews",
        title: "Have a look and see what people are saying about SWIFTFITNESS",
    },
    review_links: {
        facebook_button: { text: "See our Facebook page", url: "https://www.facebook.com/swiftfitnessgym" },
        google_button: { text: "Leave a Google review", url: "https://www.google.com/search?q=swiftfitness#lrd=0x47d9f164d7c5503f:0x38e13ff0e9cd998e,1" },
    },
    testimonials: {
        items: [
            { text: "I'm so glad I joined Swift. A welcoming gym where I don't feel intimidated. A lovely bunch of knowledgeable staff and PTs always on hand for tips and advice.", name: "Francesca Bailey" },
            { text: "Absolutely wonderful gym with lovely members of staff and brilliant equipment – couldn't recommend enough!", name: "Poppy Robinson" },
            { text: "Nothing better. Absolutely 100% recommendation. Ian and Derek are great people and go along perfectly with the friendly and strong community they have built around the gym.", name: "Ethan Culling" },
        ],
    },
    facebook: {
        heading: "From Facebook",
        image: "/images/reviews.jpg",
        image_alt: "Facebook reviews of SwiftFitness Gym",
    },
}

export const contactDefaults = {
    seo: {
        seo_title: "Contact | SwiftFitness Gym",
        seo_description: "Contact SwiftFitness Gym in Earsham, Waveney Valley.",
    },
    header: {
        breadcrumb: "Contact",
        heading: "Contact",
        intro: "Let's talk about how we can help with your fitness goals",
        photo: "/images/photo-7.jpg",
        photo_alt: "Inside SwiftFitness Gym",
    },
    details: {
        items: [
            { label: "Earsham Mill Estate, Earsham, NR35 2TQ", url: "" },
            { label: "Open 7 days a week, all hours", url: "" },
            { label: "01986 893480", url: "tel:01986893480" },
            { label: "info.swiftfitness@gmail.com", url: "mailto:info.swiftfitness@gmail.com" },
        ],
    },
}

export const membershipDefaults = {
    seo: {
        seo_title: "Gym Membership | SwiftFitness Gym",
        seo_description: "Choose your SwiftFitness Gym membership plan. Adult memberships from £31.99 a month, no contracts.",
    },
    hero: {
        breadcrumb: "Gym Membership",
        image: "/images/photo-7.jpg",
        kicker: "Join",
        title: "Choose your membership plan",
    },
    intro: {
        email: "info.swiftfitness@gmail.com",
        email_link: "mailto:info.swiftfitness@gmail.com",
        body: "Check out the membership plans below, or alternatively you can download our membership booking form, fill out the details and email it back to us!",
        form_button: { text: "Download membership form", url: "/gym-membership-form.pdf" },
    },
    plans: {
        items: membershipPlans,
    },
    card_labels: {
        price_suffix: "per month",
        button_text: "Join now",
    },
    after: {
        body: "Once you've chosen your plan and paid through the website, we take the sign-up fee separately once you're on our system. If you would prefer to come and see our facilities and sign up at the gym, please email us with your details, a date and time that would suit, and attach a clear photo of yourself so our facial recognition system can let you in. We'll then get back to you to confirm the appointment and you can have a look at your own leisure.",
        note: "Please note: our membership plans renew on the 1st of each month. If you are signing up in between months and would like to use the gym in the interim, you can visit us and pay pro rata to start using us straight away.",
    },
}

export const membershipSuccessDefaults = {
    seo: {
        seo_title: "Membership confirmed | SwiftFitness Gym",
        seo_description: "Thanks for joining SwiftFitness Gym. We will take the sign-up fee once you are on our system.",
    },
    content: {
        paid_heading: "You are on your way in",
        unpaid_heading: "We are checking your payment",
        paid_body: "Thanks for paying for {plan}. We take the sign-up fee separately once you are on our system.",
        unpaid_body: "If you have just paid, give us a moment to confirm it. If anything looks wrong, email us and we will sort it.",
        photo_instruction: "Please email a clear photo of yourself to info.swiftfitness@gmail.com so our facial recognition system can let you in. Include a date and time that would suit if you would like to come and see the gym.",
        email_button: { text: "Email a photo", url: "mailto:info.swiftfitness@gmail.com" },
        form_intro: "You can also download the membership booking form, fill it out and email it back to us.",
        form_button: { text: "Download membership form", url: "/gym-membership-form.pdf" },
    },
}

export const tattooDefaults = {
    seo: {
        seo_title: "Swift Ink Tattoo | SwiftFitness Gym",
        seo_description: "Meet Matt of Swift Ink Tattoo at SwiftFitness Gym. Over 8 years of experience, from American traditional to realism, fine line, geometric, blackwork, tribal, cover ups and cartoons.",
    },
    hero: {
        breadcrumb: "Swift Ink Tattoo",
        image: "/images/swift-ink/predator.jpg",
        kicker: "At the gym",
        title: "Matt of Swift Ink Tattoo",
    },
    intro: {
        logo: "/images/swift-ink/logo.jpg",
        logo_alt: "Swift Ink Tattoo Studio",
        heading: "Swift Ink Tattoo",
        body: "SwiftFitness Gym would like to introduce you to Matt of Swift Ink Tattoo. Matt will be bringing over 8 years of experience to SwiftFitness Gym. Matt covers all genres of tattooing, from American traditional to realism, fine line to geometric, Blackwork to tribal, cover ups to cartoons, he's literally got you covered!",
        booking_body: "To book an appointment with him please either contact us by email @ info.swiftfitness@gmail.com or follow us on Facebook or Instagram and message us there.",
        email_button: { text: "Email us", url: "mailto:info.swiftfitness@gmail.com" },
        facebook_button: { text: "Facebook", url: "https://www.facebook.com/swiftfitnessgym" },
        instagram_button: { text: "Instagram", url: "https://www.instagram.com/swiftfitness.gym/" },
    },
    gallery: {
        heading: "Recent work",
        items: [
            { image: "/images/swift-ink/predator.jpg", alt: "Predator tattoo on the calf" },
            { image: "/images/swift-ink/raven.jpg", alt: "Raven tattoo on the upper arm" },
            { image: "/images/swift-ink/predator-arm.jpg", alt: "Predator tattoo on the forearm" },
            { image: "/images/swift-ink/swallow.jpg", alt: "Swallow tattoo on the upper arm" },
            { image: "/images/swift-ink/koala.jpg", alt: "Koala tattoo on the wrist" },
        ],
    },
}
