import moment from "moment";
export const BookingData=[
    {
        id:1,
        title:"Room Cleaning",
        date: "11 Jan 2023",
        name: "Jon doe",
        img:  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    },
    {
        id:2,
        title:"Fix kitchen Sink",
        date: "11 Jan 2023",
        name: "Jon doe",
        img:  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    }
]


export const bookingStatusData =[
    {
      title: {
        content: 'Booking request sent',
      },
      description: {
        content: 'Event One Description',
      },
      time: {
        content: moment().format('ll'),
      },  icon: {
        content: 'check',
      },
    },
    {
      title: {
        content: 'Booking confirmed',
      },
      description: {
        content: 'Event Two Description',
      },
      time: {
        content: moment().format('ll'),
      },icon: {
        content: 'check',
      },
    },
    {
      title: {
        content: 'Job Started',
      },
      description: {
        content: 'Event Three Description',
      },
      time: {
        content: moment().format('ll'),
      },
      icon: {
        content: 'check',
      },
    },
    {
      title: {
        content: 'Job Completed',
      },
      description: {
        content: 'Event Four Description',
      },
      time: {
        content: moment().format('ll'),
      },
      icon: {
        content: 'check',
      },
    },
   
  ];
 