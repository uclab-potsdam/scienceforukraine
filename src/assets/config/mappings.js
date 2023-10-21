export default {
  searchFields: [
    'institution',
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
      { value: 'Position', label: 'Position' },
      { value: 'Scholarship', label: 'Scholarship' },
      { value: 'Joint application', label: 'Joint application' },
      { value: 'Resources', label: 'Resources' },
      { value: 'Mentoring', label: 'Mentoring' },
      { value: 'Academic transfer', label: 'Academic transfer' }
    ]
  }, {
    name: 'country',
    key: 'country',
    type: 'select'
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
  }, {
    name: 'open for',
    type: 'radio',
    columns: [
      { value: 'researchers', label: 'Researchers' },
      { value: 'doctoralStudents', label: 'Doctoral students' },
      { value: 'students', label: 'Students' },
      { value: 'others', label: 'Others' }
    ]
  },
  {
    name: 'remote',
    key: 'remote',
    type: 'toggle'
  }, {
    name: 'accommodation',
    key: 'accommodation',
    type: 'toggle'
  }]
}
