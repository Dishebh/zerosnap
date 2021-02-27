import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './ChatView.css';

const ChatView = ({ image }) => {
  const history = useHistory();

  const exit = () => history.replace('/chats');

  return (
    <div className='chatView'>
      <img onClick={exit} src={image.imageUrl} alt='chat view' />
      <div className='chatView__timer'>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          stokeWidth={1}
          size={50}
          colors={[
            ['#004777', 0.33],
            ['#F7B801', 0.33],
            ['#A30000', 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) exit();
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  image: state.image,
});

export default connect(mapStateToProps, {})(ChatView);
