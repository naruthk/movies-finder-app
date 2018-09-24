import React from 'react'
import PropTypes from 'prop-types';
import { Container, Grid } from 'semantic-ui-react'
import CastItem from '../Item/'
import ScrollableModal from '../../Modal/Scrollable'

const CastSection = (props) => (
  <Grid>
    {props.cast.slice(0, 8).map((person, index) => <CastItem key={index + "-item"} person={person} /> )}
    <Container textAlign='center'>
      <ScrollableModal buttonText='Show all cast members' modalTitle="Cast Members">
        {props.cast.map((person, index) => <CastItem key={index + "-item"} person={person} /> )}
      </ScrollableModal>
    </Container>
  </Grid>
)

export default CastSection

CastSection.propTypes = {
  cast: PropTypes.array.isRequired
}