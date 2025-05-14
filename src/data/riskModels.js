export const riskModels = {
    tomato: {
      tuta_absoluta: {
        control_costs: { label: 'Control Costs (€)', placeholder: 'e.g. 100', help: 'Total pest control costs' },
        price_per_unit: { label: 'Price per Unit (€/kg)', placeholder: 'e.g. 2.5', help: 'Market value per kg of crop' },
        expected_yield_per_plant: { label: 'Expected Yield/Plant (kg)', placeholder: 'e.g. 3.2', help: 'Predicted yield per plant' },
        number_of_plants: { label: 'Number of Plants', placeholder: 'e.g. 1000', help: 'Total crop plants' },
        cumulative_yield: { label: 'Cumulative Yield (kg)', placeholder: 'e.g. 500', help: 'Already harvested yield' },
        crop_age: { label: 'Crop Age (days)', placeholder: 'e.g. 30', help: 'Crop growth in days' },
        r: { label: 'Pest Growth Rate (r)', placeholder: '0.103', help: 'Optional advanced setting' },
        d: { label: 'Effectiveness Delay (d)', placeholder: '5.0', help: 'Optional treatment delay in days' },
      },
    },
    cucumber: {
      tetranychus_urticae: {
        cost: { label: 'Cost of Control (€)', placeholder: 'e.g. 100', help: 'Pest control cost' },
        value: { label: 'Market Value (€/kg)', placeholder: 'e.g. 1.8', help: 'Price per kg yield' },
        I: { label: 'Injury per Pest (I)', placeholder: 'e.g. 0.5', help: 'Injury from a single mite' },
        D: { label: 'Damage per Unit Injury (D)', placeholder: 'e.g. 0.4', help: 'Yield loss per injury unit' },
        K: { label: 'Control Effectiveness (K)', placeholder: 'e.g. 0.8', help: 'Effectiveness from 0 to 1' },
      },
    },
  }
  