import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TableHead, TableHeader, Table, TableRow, TableBody, TableCell } from '@/components/ui/table'
import { DashboardData } from '@/types'
import { formatDateTime, formatINR, formatNumber } from '@/util/helpers'
import { Binoculars, ChartNoAxesColumn, CreditCard, IndianRupee, Notebook, ScanBarcode, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Charts from './charts'

function OverviewSection({ summary }: { summary: DashboardData }) {
    return (
        <div className='space-y-3 md:space-y-6'>
            <div className="font-bold text-3xl space-y-4">Dashboard</div>
            <div className="grid md:gap-4 lg:gap-6  grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

                <Card className=''>
                    <CardHeader className='flex justify-between items-center'>
                        <CardTitle className='text-md font-bold text-muted-foreground'>Total Revenue</CardTitle>
                        <span className='text-gray-400'><IndianRupee /></span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatINR(Number(summary.totalSales || 0))}
                        </div>
                    </CardContent>
                </Card>


                <Card className=''>
                    <CardHeader className='flex justify-between items-center'>
                        <CardTitle className='text-md font-bold text-muted-foreground'>Orders</CardTitle>
                        <span className='text-gray-400'><CreditCard /></span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatNumber(Number(summary.ordersCount))}
                        </div>
                    </CardContent>
                </Card>

                <Card className=''>
                    <CardHeader className='flex justify-between items-center'>
                        <CardTitle className='text-md font-bold text-muted-foreground'>Customers</CardTitle>
                        <span className='text-gray-400'><Users /></span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatNumber(Number(summary.usersCount))}
                        </div>
                    </CardContent>
                </Card>

                <Card className=''>
                    <CardHeader className='flex justify-between items-center'>
                        <CardTitle className='text-md font-bold text-muted-foreground'>Products</CardTitle>
                        <span className='text-gray-400'><ScanBarcode /></span>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {formatNumber(Number(summary.productsCount))}
                        </div>
                    </CardContent>
                </Card>


            </div>
            <div className="grid gap-2 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">

                <Card className="col-span-4 h-full">
                    <CardHeader className='flex justify-between items-center'>
                        <CardTitle className='text-md font-bold text-muted-foreground'>Overview</CardTitle>
                        <span className='text-gray-400'><ChartNoAxesColumn /></span>

                    </CardHeader>
                    <CardContent className='h-full'>
                        <Charts data={{salesData: summary.salesData}}/>
                    </CardContent>
                </Card>


                <Card className="col-span-3">
                    <CardHeader className='flex justify-between items-center'>
                        <CardTitle className='text-md font-bold text-muted-foreground'>Recent Sales</CardTitle>
                        <span className='text-gray-400'><Notebook /></span>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Buyer</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {summary.latestSales.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>
                                            {order.user.name ? order.user.name : "Deleted User"}
                                        </TableCell>
                                        <TableCell>{formatDateTime(new Date(order.createdAt)).dateOnly}</TableCell>
                                        <TableCell>{formatINR(Number(order.totalPrice))}</TableCell>
                                        <TableCell>
                                            <Link
                                                href={`/order/${order.id}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button className='rounded-full bg-gray-600'>Details</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </div>
        </div>
    )
}

export default OverviewSection