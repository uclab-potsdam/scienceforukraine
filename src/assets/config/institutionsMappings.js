export default {
  searchFields: [
    'institution',
    'about',
    'description',
    'contact',
    'link',
    'researchFocus',
    'id'
  ],
  filters: [{
    name: 'category',
    type: 'radio',
    primary: true,
    // hideLabel: true,
    columns: [
      { value: 'cooperation', label: 'Cooperation Offer' },
      { value: 'support', label: 'Support Request' }
    ]
  }, {
    name: 'discipline',
    type: 'radio',
    columns: [
      { value: 'naturalSciences', label: 'Natural sciences' },
      { value: 'socialSciences', label: 'Social sciences' },
      { value: 'humanitiesAndTheArts', label: 'Humanities & the arts' },
      { value: 'engineeringAndTechnology', label: 'Engineering & technology' },
      { value: 'medicalAndHealthSciences', label: 'Medical & health sciences' },
      { value: 'agriculturalAndVeterinarySciences', label: 'Agricultural & veterinary sciences' },
      { value: 'unspecified', label: 'Unspecified' }
    ]
  }]
}
