import { type CSSProperties } from 'react'
import { PulseLoader } from 'react-spinners'
import { DONE, LOADING } from '../../utils/loadingStates'
import { YELLOW } from '../../utils/colorSchemes'
import { useShoppingListsContext } from '../../hooks/contexts'
import DashboardLayout from '../../layouts/dashboardLayout/dashboardLayout'
import ShoppingListGrouping from '../../components/shoppingListGrouping/shoppingListGrouping'
import ShoppingListCreateForm from '../../components/shoppingListCreateForm/shoppingListCreateForm'

const loaderStyles: CSSProperties = {
  textAlign: 'center',
}

const ShoppingListsPage = () => {
  const { shoppingListsLoadingState } = useShoppingListsContext()

  return (
    <DashboardLayout title="Your Shopping Lists" includeGameSelector>
      <>
        <ShoppingListCreateForm />
        {shoppingListsLoadingState === LOADING && (
          <PulseLoader
            color={YELLOW.schemeColorDark}
            cssOverride={loaderStyles}
            data-testid="pulseLoader"
          />
        )}
        {shoppingListsLoadingState === DONE && <ShoppingListGrouping />}
      </>
    </DashboardLayout>
  )
}

export default ShoppingListsPage