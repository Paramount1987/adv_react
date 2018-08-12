import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchLazy, selectEvent, eventListSelector } from '../../ducks/events';
import Loader from '../common/Loader';
import { Table, Column, InfiniteLoader } from 'react-virtualized';
import 'react-virtualized/styles.css';

class EventList extends Component {
  componentDidMount() {
    this.props.fetchLazy();
  }

  render() {
    const { loading, events } = this.props;
    if (loading) return <Loader />;
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        rowCount={this.props.events.length + 1}
        loadMoreRows={this.loadMoreRows}
      >
        {({onRowsRendered, registerChild}) =>
            <Table
              ref={registerChild}
              rowCount={events.length}
              rowGetter={this.rowGetter}
              rowHeight={40}
              headerHeight={50}
              overscanRowCount={5}
              width={700}
              height={300}
              onRowClick={this.handleRowClick}
              onRowsRendered={onRowsRendered}
            >
              <Column label="title" dataKey="title" width={250} />
              <Column label="where" dataKey="where" width={250} />
              <Column label="when" dataKey="month" width={200} />
          </Table>
        }
      </InfiniteLoader>
    );
  }

  loadMoreRows = () => {
    console.log('------', 'load more');
    this.props.fetchLazy();
  }

  isRowLoaded = ({ index }) => {
    return index < this.props.events.length;
  }

  rowGetter = ({ index }) => {
    return this.props.events[index];
  };

  handleRowClick = rowData => {
    const { selectEvent } = this.props;
    selectEvent && selectEvent(rowData.uid);
  };
}

export default connect(
  state => ({
    events: eventListSelector(state),
    loading: state[moduleName].loading,
  }),
  { fetchLazy, selectEvent }
)(EventList);
