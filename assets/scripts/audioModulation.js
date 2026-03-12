export class AudioModulator {
  constructor(audioSource, fft) {
    this.audioElement = new Audio(audioSource);
    this.audioContext = new AudioContext();

    this.audioAnalyserNode = this.audioContext.createAnalyser();
    this.audioSourceNode = this.audioContext.createMediaElementSource(
      this.audioElement,
    );

    this.audioSourceNode.connect(this.audioAnalyserNode);
    this.audioAnalyserNode.connect(this.audioContext.destination);

    this.audioAnalyserNode.fftSize = fft;
    this.bufferLength = this.audioAnalyserNode.frequencyBinCount;
    this.audioData = new Uint8Array(this.bufferLength);

    document.addEventListener("click", () => {
      if (this.audioContext.state === "suspended") {
        this.audioContext.resume();
      }
      this.audioElement.play();
    });
  }

  getTimeDomainData() {
    this.audioAnalyserNode.getByteTimeDomainData(this.audioData);
    return this.audioData;
  }

  getFrequencyData() {
    this.audioAnalyserNode.getByteFrequencyData(this.audioData);
    return this.audioData;
  }
}
