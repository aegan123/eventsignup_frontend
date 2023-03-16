import styled from 'styled-components'

const RotatingLogo = styled.img`
  display: inline-block;
  vertical-align: middle;
  -webkit-transform: perspective(1px) translateZ(0);
  transform: perspective(1px) translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
  -webkit-transition-duration: 0.5s;
  transition-duration: 0.5s;
  -webkit-transition-property: transform;
  transition-property: transform;

  &:hover,
  &:focus,
  &:active {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
`

export { RotatingLogo }
