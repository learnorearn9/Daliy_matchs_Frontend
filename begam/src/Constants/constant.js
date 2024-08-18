// constants.js

// Hero Section Data
export const HERO_SECTION_DATA = {
    heading: "Play Everyday",
    subheading: "Tournaments",
    description: "Compete in Free and Paid entry Tournaments. Transform your games to real money eSports",
    buttons: {
        loggedIn: {
            text: "Get Started",
            link: "/tournament"
        },
        loggedOut: {
            text: "Get Started",
            link: "/login"
        }
    },
    playIcon: "images/play-icon.png",
    versusImage: "images/versus.png",
    leftBanner: "images/left-banner.png",
    rightBanner: "images/right-banner.png"
};

// Features Data
export const FEATURES_DATA = [
  {
    imgSrc: 'images/features-icon-1.png',
    title: 'Premium Support',
    description: 'Our dedicated team ensures you receive immediate assistance, with an average response time of just 5 minutes.'
  },
  {
    imgSrc: 'images/features-icon-2.png',
    title: 'Instant Deposits',
    description: 'Deposit funds in one click and join the match instantly.'
  },
  {
    imgSrc: 'images/features-icon-3.png',
    title: 'Climb the Leaderboards',
    description: 'Compete fiercely to rise through the ranks and earn the coveted title of Player of the Week.'
  },
  {
    imgSrc: 'images/features-icon-4.png',
    title: 'MAKE UP TO 75X',
    description: 'Ensuring you\'re ready to receive your winnings by the end of the tournament.'
  },
  {
    imgSrc: 'images/features-icon-5.png',
    title: 'Make up to 10X your $$',
    description: 'Make up to 10X your money on multiplayer tourneys. With paid and free entry.'
  },
  {
    imgSrc: 'images/features-icon-6.png',
    title: 'Play at your Level',
    description: 'Discover tailored tournaments for all skill levels, ensuring fairness and excitement for every player.'
  }
];

// Combine all homepage-related constants
export const HOME_PAGE_DATA = {
    heroSection: HERO_SECTION_DATA,
    features: FEATURES_DATA
};

// src/Constants/constants.js

export const ABOUT_PAGE_DATA = {
    banner: {
      heading: "About Us",
      breadcrumb: [
        { label: "Home", link: "/home" },
        { label: "About Us", link: "/about" }
      ],
      images: {
        img1: 'images/banner-circle-1.png',
        img2: 'images/banner-circle-2.png',
        img3: 'images/banner-circle-2.png'
      }
    },
    aboutSection: {
      title: "ABOUT Begam",
      paragraphs: [
        "Welcome to our platform, the ultimate destination for thrilling and competitive gaming tournaments. We pride ourselves on creating a space where players of all skill levels, from beginners to professionals, can come together and showcase their talents in exciting matches.",
        "Our tournaments are designed to be inclusive and competitive, offering opportunities for everyone to participate and compete for glory. Whether you're just starting your gaming journey or you're a seasoned pro, our platform provides the perfect stage for you to demonstrate your skills and rise to the top.",
        "Each tournament is a battle of wits and skills, and we reward the top 10 players with fantastic prizes. Our reward system is designed to motivate and recognize the best players, ensuring that your hard work and dedication are always appreciated.",
        "To maintain the integrity of our competitions, we have implemented rigorous monitoring systems. Our advanced anti-cheat technology ensures that no hacker can use any unfair means to gain an advantage. We are committed to providing a fair and level playing field for all participants, so you can focus on what you do best – playing your heart out and enjoying the game. Join us today and become part of a vibrant community of gamers who are passionate about competition, fairness, and fun. Your journey to becoming a champion starts here."
      ]
    },
    teamSection: {
      title: "Our Management Team",
      description: "We love hearing from our community! If you have any questions or need assistance with setting up custom matches, feel free to reach out to any of our team members. We pride ourselves on our quick response time and will get back to you within 10 minutes. Your satisfaction is our top priority!",
      members: [
        {
          name: "Tarah Landry",
          position: "Chief Executive Officer",
          img: 'images/team-1.png',
          socialLinks: {
            facebook: "#",
            twitter: "#",
            instagram: "#"
          }
        },
        {
          name: "Abe Gordon",
          position: "Chief Financial Officer",
          img: 'images/team-2.png',
          socialLinks: {
            facebook: "#",
            twitter: "#",
            instagram: "#"
          }
        },
        {
          name: "Neville Saylor",
          position: "Chief Technology Officer",
          img: 'images/team-3.png',
          socialLinks: {
            facebook: "#",
            twitter: "#",
            instagram: "#"
          }
        },
        {
          name: "Russel Laughlin",
          position: "Technology Manager",
          img: 'images/team-1.png',
          socialLinks: {
            facebook: "#",
            twitter: "#",
            instagram: "#"
          }
        }
      ]
    }
  };

  