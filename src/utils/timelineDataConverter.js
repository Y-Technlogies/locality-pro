import moment from "moment";

const timelineDataConverter = (data, name) => {
  const events = [];
  if (data?.isSelected) {
    const event = {
      title: {
        content: `User send the job request.`,
      },

      time: {
        content: moment(data.confirmDate).format("ll"),
      },
      icon: {
        content: "pencil",
      },
    };
    events.push(event);
  }
  if (data?.isConfirmed) {
    const event = {
      title: {
        content: `${name} confirm the job`,
      },

      time: {
        content: moment(data.confirmDate).format("ll"),
      },
      icon: {
        content: "pencil",
      },
    };
    events.push(event);
  }
  if (data?.isStarted) {
    const event = {
      title: {
        content: `${name} started the job.`,
      },

      time: {
        content: moment(data.start_date).format("ll"),
      },
      icon: {
        content: "pencil",
      },
    };
    events.push(event);
  }
  if (data?.isCompleted) {
    const event = {
      title: {
        content: `${name} completed the job.`,
      },

      time: {
        content: moment(data.complete_date).format("ll"),
      },
      icon: {
        content: "pencil",
      },
    };
    events.push(event);
  }
  if (data?.isPaid) {
    const event = {
      title: {
        content: `User paid the bill.`,
      },

      time: {
        content: moment(data.complete_date).format("ll"),
      },
      icon: {
        content: "pencil",
      },
    };
    events.push(event);
  }

  return events;
};
export default timelineDataConverter;
