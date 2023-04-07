import StyledSelectOption from './styledSelectOption'

export default { title: 'StyledSelectOption' }

/**
 *
 * As a rule, we don't want these options to have bullet points, however,
 * the presence or absence of bullet points on a <li> element (which the
 * StyledSelectOption is) is determined by the `list-style-type` CSS
 * property on the parent <ul>. The WithStyledParent story gives an
 * imperfect example of what this component looks like when the parent
 * <ul> is styled appropriately.
 *
 */

export const WithShortName = () => (
  <StyledSelectOption
    optionName="Option 1"
    optionValue={12}
    onSelected={() => {}}
    ariaSelected={false}
  />
)

// Ugly name but this name caused it to wrap weirdly in the past so
// this name will be used to ensure that isn't happening.
export const WithLongName = () => (
  <StyledSelectOption
    optionName="This Name Has 50 Characters Exactly 1234 Wwwwwwwww"
    optionValue="De finibus bonorum et malorum"
    onSelected={() => {}}
    ariaSelected={false}
  />
)

export const WithStyledParent = () => (
  <ul style={{ listStyleType: 'none', paddingLeft: '12px' }}>
    <StyledSelectOption
      optionName="Option 1"
      optionValue={23}
      onSelected={() => {}}
      ariaSelected={false}
    />
  </ul>
)

export const WithLongNameAndStyledParent = () => (
  <ul style={{ listStyleType: 'none', paddingLeft: '12px' }}>
    <StyledSelectOption
      optionName="This Name Has 50 Characters Exactly 1234 Wwwwwwwww"
      optionValue={23}
      onSelected={() => {}}
      ariaSelected={false}
    />
  </ul>
)

/**
 *
 * This has no special appearance, but inspecting the element
 * will reveal that its `aria-selected` attribute is set to "true".
 *
 */

export const Selected = () => (
  <StyledSelectOption
    optionName="Option 1"
    optionValue="Option Value"
    onSelected={() => {}}
    ariaSelected={true}
  />
)
