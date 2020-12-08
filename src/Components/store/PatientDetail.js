import create from 'zustand'

const usePatientDetail = create(set => ({
  patientDetail: {},
  setPatientDetail: payload => set({ patientDetail: payload }),
}))

export default usePatientDetail
