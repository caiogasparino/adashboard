import { create } from 'zustand'

interface Variable {
  name: string
  aprodvalue: string
  abetavalue: string
}

interface VariableState {
  variables: (Variable & { isNew?: boolean })[]
  setVariables: (variables: (Variable & { isNew?: boolean })[]) => void
}

const useVariableStore = create<VariableState>(set => ({
  variables: [],
  setVariables: variables => set({ variables }),
}))

export default useVariableStore
