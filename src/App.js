import React, { Component } from 'react';
import {
  LineChart,
  Line,
  Tooltip,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from 'recharts';

class EEGPlot extends Component {
  constructor(props) {
    super(props);

    // Initialize state for EEG data and EEG density data
    this.state = {
      numChannels: 33,
      numSamples: 1000,
      eegData: [],
      ampFreqData: [],
      timeData: [],
      brainwaveData: [],
      eegDensityData: [], // Added for EEG density graph
      currentTime: 0, // To keep track of time
    };

    // Set up a timer to simulate real-time updates (replace this with your data source)
    this.updateInterval = setInterval(this.simulateDataUpdate, 1000); // Adjust the update interval as needed
  }

  // Simulate data updates (replace this with your data source)
  simulateDataUpdate = () => {
    const { numChannels } = this.state;
    const newEEGData = [];
    const newAmpFreqData = [];
    const newTimeData = [];
    const newBrainwaveData = [];

    const currentTime = this.state.currentTime + 1; // Increment time by 1 second

    for (let i = 0; i < numChannels; i++) {
      newEEGData.push(Math.random()); // Simulate EEG data
    }

    // Simulate Amplitude vs. Frequency data
    const f = Math.random() * 100; // Simulate frequency
    const Pxx = Math.random() * 10; // Simulate power
    newAmpFreqData.push({ frequency: f, amplitude: 10 * Math.log10(Pxx) });

    // Simulate Amplitude vs. Time data
    newTimeData.push({ time: currentTime, amplitude: newEEGData[0] });

    // Simulate Brainwave data
    const deltaWave = 0.2 * Math.random() * Math.sin(2 * Math.PI * 0.5 * currentTime + 0.1); // Delta wave (0.5 Hz)
    const thetaWave = 0.2 * Math.random() * Math.sin(2 * Math.PI * 4 * currentTime + 0.2); // Theta wave (4 Hz)
    const alphaWave = 0.2 * Math.random() * Math.sin(2 * Math.PI * 8 * currentTime + 0.3); // Alpha wave (8 Hz)
    const betaWave = 0.2 * Math.random() * Math.sin(2 * Math.PI * 16 * currentTime + 0.4); // Beta wave (16 Hz)
    const gammaWave = 0.2 * Math.random() * Math.sin(2 * Math.PI * 32 * currentTime + 0.5); // Gamma wave (32 Hz)

    newBrainwaveData.push({ time: currentTime, Delta: deltaWave, Theta: thetaWave, Alpha: alphaWave, Beta: betaWave, Gamma: gammaWave });

    // Update EEG density data (EEG density graph)
    const newEEGDensityData = Array.from({ length: numChannels }, (_, i) => ({
      x: i,               // X-axis represents channels
      y: currentTime,     // Y-axis represents time (sample index)
      density: Math.random() * 300,  // Simulate density data
    }));

    // Update state and limit data to the last 20 seconds
    this.setState(prevState => ({
      eegData: [...prevState.eegData, newEEGData],
      ampFreqData: [...prevState.ampFreqData, ...newAmpFreqData],
      timeData: [...prevState.timeData.slice(-20), ...newTimeData.slice(-20)],
      brainwaveData: [...prevState.brainwaveData.slice(-20), ...newBrainwaveData.slice(-20)],
      eegDensityData: [...prevState.eegDensityData.slice(-numChannels), ...newEEGDensityData],
      currentTime,
    }));
  };

  componentWillUnmount() {
    clearInterval(this.updateInterval); // Clear the update timer when the component is unmounted
  }

  render() {
    const { eegData, ampFreqData, timeData, brainwaveData, eegDensityData } = this.state;

    // Define a color scale for the density
    const colorScale = (density) => {
      // You can customize the color scale based on your density values
      // For example, you can use different colors for different density ranges.
      if (density < 100) {
        return 'blue';
      } else if (density < 200) {
        return 'green';
      } else {
        return 'red';
      }
    };

    return (
      <div>
        <h1>Brainwave Data</h1>
        <div className="brainwave-chart">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={brainwaveData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line dataKey="Delta" stroke="#8884d8" name="Delta" />
              <Line dataKey="Theta" stroke="#82ca9d" name="Theta" />
              <Line dataKey="Alpha" stroke="#ffc658" name="Alpha" />
              <Line dataKey="Beta" stroke="#d34141" name="Beta" />
              <Line dataKey="Gamma" stroke="#ff5733" name="Gamma" /> {/* Add this line for Gamma */}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Display the Brainwave Amplitude Graph using BarChart */}
        <h1>Brainwave Amplitude</h1>
        <div className="brainwave-amplitude-chart">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={brainwaveData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Delta" fill="#8884d8" name="Delta" />
              <Bar dataKey="Theta" fill="#82ca9d" name="Theta" />
              <Bar dataKey="Alpha" fill="#ffc658" name="Alpha" />
              <Bar dataKey="Beta" fill="#d34141" name="Beta" />
              <Bar dataKey="Gamma" fill="#ff5733" name="Gamma" /> {/* Add this bar for Gamma */}
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <h1>EEG Data</h1>
        <div className="eeg-chart">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={eegData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              {eegData.map((channel, index) => (
                <Line key={index} dataKey={index} stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <h1>Amplitude vs. Frequency</h1>
        <div className="amp-freq-chart">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={ampFreqData}>
              <XAxis dataKey="frequency" />
              <YAxis />
              <Tooltip />
              <Line dataKey="amplitude" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default EEGPlot;
