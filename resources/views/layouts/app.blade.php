<!DOCTYPE html>
<?xml version="1.0" encoding="utf-8"?>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="content-type" content="text/html; charset=utf-8" >
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="permisos" content="{{$admin}}">
    <meta name="nombre" content="{{$nombre}}">
    <!-- Fonts -->
    <link rel="dns-prefetch" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Raleway:300,400,600" rel="stylesheet" type="text/css">

    <title>{{ config('app.name', 'CHEX')}}</title>

    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>

    <div id="react-chex"></div>
    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none">
        {{ csrf_field() }}
    </form>
    <script src="{{ mix('js/app.js') }}"></script>

</body>
</html>
