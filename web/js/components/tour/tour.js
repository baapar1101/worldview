import React from 'react';
import TourStart from './modal-start';
import TourInProgress from './modal-in-progress';
import TourComplete from './modal-complete';

class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: this.props.models,
      ui: this.props.ui,
      config: this.props.config,
      data: null,
      modalStart: true,
      modalInProgress: false,
      modalComplete: false,
      steps: 1,
      totalSteps: 10,
      isLoading: false,
      error: null
    };

    this.toggleModalStart = this.toggleModalStart.bind(this);
    this.toggleModalInProgress = this.toggleModalInProgress.bind(this);
    this.toggleModalComplete = this.toggleModalComplete.bind(this);
    this.startTour = this.startTour.bind(this);
    this.restartTour = this.restartTour.bind(this);
    this.incrementStep = this.incrementStep.bind(this);
    this.decreaseStep = this.decreaseStep.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await fetch('../stories/stories.json');
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      this.setState({ data: json });
    } catch (error) {
      console.log(error);
    }
  }

  toggleModalStart(e) {
    e.preventDefault();
    this.setState({
      modalStart: !this.state.modalStart
    });
  }

  toggleModalInProgress(e) {
    e.preventDefault();
    this.setState({
      modalInProgress: !this.state.modalInProgress
    });
  }

  toggleModalComplete(e) {
    e.preventDefault();
    this.setState({
      modalComplete: !this.state.modalComplete
    });
  }

  startTour(event, color) {
    event.preventDefault();
    console.log(color);
    this.setState({
      steps: 1,
      modalStart: false,
      modalInProgress: true,
      modalComplete: false
    });
  }

  restartTour(e) {
    e.preventDefault();
    this.setState({
      steps: 1,
      modalStart: true,
      modalInProgress: false,
      modalComplete: false
    });
  }

  incrementStep(e) {
    if (this.state.steps + 1 <= this.state.totalSteps) this.setState({ steps: this.state.steps + 1 });
    if (this.state.steps + 1 === this.state.totalSteps + 1) {
      this.toggleModalInProgress(e);
      this.toggleModalComplete(e);
    }
  }

  decreaseStep(e) {
    if (this.state.steps - 1 >= 1) this.setState({ steps: this.state.steps - 1 });
  }

  render() {
    return (
      <div>
        <TourStart
          data={this.state.data}
          modalStart={this.state.modalStart}
          toggleModalStart={this.toggleModalStart}
          toggleModalInProgress={this.toggleModalInProgress}
          toggleModalComplete={this.toggleModalComplete}
          startTour={this.startTour}
        ></TourStart>

        <TourInProgress
          models={this.state.models}
          config={this.state.config}
          ui={this.state.ui}
          data={this.state.data}
          modalInProgress={this.state.modalInProgress}
          toggleModalStart={this.toggleModalStart}
          toggleModalInProgress={this.toggleModalInProgress}
          toggleModalComplete={this.toggleModalComplete}
          startTour={this.startTour} steps={this.state.steps}
          totalSteps={this.state.totalSteps}
          incrementStep={this.incrementStep}
          decreaseStep={this.decreaseStep}
        ></TourInProgress>

        <TourComplete
          modalComplete={this.state.modalComplete}
          toggleModalStart={this.toggleModalStart}
          toggleModalInProgress={this.toggleModalInProgress}
          toggleModalComplete={this.toggleModalComplete}
          restartTour={this.restartTour}
        ></TourComplete>
      </div>
    );
  }
}

export default Tour;