import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import BridgeList from 'components/BridgeList'
import matchRouteAndMapDispatchToProps from 'utils/matchRouteAndMapDispatchToProps'
import { withSiteData } from 'react-static'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { fetchBridges } from 'actions'

const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 5
  }
})

const renderBridgeList = ({bridges, bridgeCount, pageSize, bridgesFetching, bridgesError, fetchBridges}) => (
  <BridgeList
    bridges={bridges}
    bridgeCount={bridgeCount}
    pageSize={pageSize}
    fetching={bridgesFetching}
    error={bridgesError}
    fetchBridges={fetchBridges}
  />
)

export class Bridges extends Component {
  componentDidMount () {
    this.props.fetchBridges(1, this.props.pageSize)
  }

  render () {
    const { classes } = this.props

    return (
      <div>
        <Typography variant='display2' color='inherit' className={classes.title}>
          Bridges
        </Typography>

        <Grid container spacing={40}>
          <Grid item xs={12}>
            {renderBridgeList(this.props)}
          </Grid>
        </Grid>
      </div>
    )
  }
}

Bridges.propTypes = {
  classes: PropTypes.object.isRequired,
  bridgeCount: PropTypes.number.isRequired,
  bridges: PropTypes.array.isRequired,
  bridgesFetching: PropTypes.bool.isRequired,
  bridgesError: PropTypes.string,
  pageSize: PropTypes.number
}

Bridges.defaultProps = {
  pageSize: 10
}

const mapStateToProps = state => {
  let bridgesError
  if (state.bridges.networkError) {
    bridgesError = 'There was an error fetching the bridges. Please reload the page.'
  }

  return {
    bridgeCount: state.bridges.count,
    bridges: state.bridges.items,
    bridgesFetching: state.bridges.fetching,
    bridgesError: bridgesError
  }
}

export const ConnectedBridges = connect(
  mapStateToProps,
  matchRouteAndMapDispatchToProps({fetchBridges})
)(Bridges)

export default withSiteData(withStyles(styles)(ConnectedBridges))
