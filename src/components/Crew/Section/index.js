import React from 'react'
import { Container, Grid } from 'semantic-ui-react'
import CrewItem from '../Item'
import ScrollableModal from '../../Modal/Scrollable'

const CastSection = (props) => (
  <Grid>
    {props.crew.slice(0, 8).map((person, index) => <CrewItem key={index + "-item"} person={person} /> )}
    <Container textAlign='center'>
      <ScrollableModal buttonText='Show all production staff' modalTitle="Crew">
        {props.crew.map((person, index) => <CrewItem key={index + "-item"} person={person} /> )}
      </ScrollableModal>
    </Container>
  </Grid>
)

export default CastSection