import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const VideoCall = () => {
  const [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomID = 'my-room';

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:3000');
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      userVideo.current.srcObject = stream;
      socketRef.current.emit('join', roomID);

      socketRef.current.on('user-joined', (userID) => {
        const peer = createPeer(userID, socketRef.current.id, stream);
        peersRef.current.push({
          peerID: userID,
          peer,
        });
        setPeers((users) => [...users, peer]);
      });

      socketRef.current.on('signal', (payload) => {
        const item = peersRef.current.find((p) => p.peerID === payload.from);
        if (item) {
          item.peer.signal(payload.signal);
        }
      });

      socketRef.current.on('user-left', (id) => {
        const peerObj = peersRef.current.find((p) => p.peerID === id);
        if (peerObj) {
          peerObj.peer.destroy();
        }
        const peers = peersRef.current.filter((p) => p.peerID !== id);
        peersRef.current = peers;
        setPeers(peers);
      });
    });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socketRef.current.emit('signal', {
        to: userToSignal,
        from: callerID,
        signal,
        room: roomID,
      });
    });

    return peer;
  }

  return (
    <div>
      <video muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        return (
          <Video key={index} peer={peer} />
        );
      })}
    </div>
  );
};

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <video ref={ref} autoPlay playsInline />;
};

export default VideoCall;
