import useRoyalties from '@/hooks/useRoyalties'

const Royalties = () => {
  const { data } = useRoyalties()

  console.log(data)

  return <div>Royalties</div>
}

export default Royalties
